import Joi from "joi";

const transactionSchemas = {
  topup: Joi.object({
    top_up_amount: Joi.number().min(1).required().messages({
      "number.min":
        "Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
      "number.empty": "Parameter top_up_amount tidak boleh kosong",
      "any.required": "Parameter top_up_amount diperlukan",
    }),
  }),

  transaction: Joi.object({
    service_code: Joi.string().required().messages({
      "string.empty": "Parameter service_code tidak boleh kosong",
      "any.required": "Parameter service_code diperlukan",
    }),
  }),

  transactionHistory: Joi.object({
    offset: Joi.number().required().messages({
      "number.empty": "Parameter offset tidak boleh kosong",
      "any.required": "Parameter offset diperlukan",
    }),
    limit: Joi.number().optional(),
  }),
};

export default transactionSchemas;
