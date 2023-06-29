import { NextFunction, Request, Response } from 'express';
import ValidationException from '../exceptions/ValidationException';
import { IOrder } from "../constants/interfaces"
import orderService from "../services/orderService";

export const getOrders = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const orders = await orderService.getOrders();
        response.status(200).send({ status: "OK", orders });
    } catch (error) {
        next(error)
    }
}

export const getOrder = async (request: Request, response: Response, next: NextFunction) => {
    try {

        const order = await orderService.getOrder(Number(request.params.orderId));
        response.status(200).send({ status: "OK", order });
    } catch (error) {
        next(error)
    }
}

export const createOrder = async (request: Request, response: Response, next: NextFunction) => {
    try {

        const body: IOrder = request.body;
        // TODO: Check types

        if (!body.name) {
            throw new ValidationException("One of the following keys is missing or is empty in request body: 'name'")
        }

        await orderService.createOrder(body);
        response.status(200).send({ status: "OK", message: "order creted successfuly" });
    } catch (error) {
        next(error)
    }
}

export const updateOrderStatus = async (request: Request, response: Response, next: NextFunction) => {
    try {

        await orderService.updateOrderStatus(Number(request.params.orderId));
        response.status(200).send({ status: "OK", message: "order status updated successfuly" });
    } catch (error) {
        next(error)
    }
}

export default {
    getOrders,
    getOrder,
    createOrder,
    updateOrderStatus
}
