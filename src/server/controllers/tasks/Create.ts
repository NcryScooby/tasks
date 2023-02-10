import { validation } from "../../middleware";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import * as yup from "yup";
import { Task } from "@prisma/client";
import { prismaClient } from "../../../database/prisma";

interface IBodyProps extends Omit<Task, "id"> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      title: yup.string().required().min(3),
      completed: yup.boolean().default(false),
      important: yup.boolean().required(),
      createdAt: yup.date().required(),
      updatedAt: yup.date().required(),
    })
  ),
}));

export const create = async (req: Request<{}, {}, Task>, res: Response) => {
  try {
    const { title, important, createdAt, updatedAt } = req.body;

    const { id } = await prismaClient.task.create({
      data: {
        title,
        completed: false,
        important,
        createdAt,
        updatedAt,
      },
    });

    res.status(StatusCodes.CREATED).json(id);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong",
    });
  }
};
