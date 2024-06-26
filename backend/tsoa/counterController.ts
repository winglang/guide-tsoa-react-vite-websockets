import cors from "cors";

import {
	Controller,
	Get,
	Post,
	Route,
  Middlewares,
	Request,
} from "tsoa";
import { getClient } from "@winglibs/tsoa/clients.js";
import { Request as Req} from "express";

@Route("counter")
@Middlewares(cors())
export class CounterController extends Controller {
	@Get()
	public async getValue(
		@Request() request: Req,
	): Promise<number> {
		let counter = getClient(request, "counter");
		return await counter.peek();
	}


	@Post()
	public async incrementCounter(
		@Request() request: Req,
	): Promise<number> {
    let counter = getClient(request, "counter");
    let broadcaster = getClient(request, "broadcaster");
    let oldValue = await counter.inc();
    broadcaster.broadcast("refresh");
		return oldValue + 1;
	}
}