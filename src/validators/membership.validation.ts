import Joi from "joi";

const membershipSchemas = {
  register: Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Parameter email tidak sesuai format",
      "string.empty": "Parameter email tidak boleh kosong",
      "any.required": "Parameter email diperlukan",
    }),
    first_name: Joi.string().required().messages({
      "string.empty": "Parameter first_name tidak boleh kosong",
      "any.required": "Parameter first_name diperlukan",
    }),
    last_name: Joi.string().required().messages({
      "string.empty": "Parameter last_name tidak boleh kosong",
      "any.required": "Parameter last_name diperlukan",
    }),
    password: Joi.string().min(8).required().messages({
      "string.min":
        "Parameter password harus memiliki panjang minimal 8 karakter",
      "string.empty": "Parameter password tidak boleh kosong",
      "any.required": "Parameter password diperlukan",
    }),
  }),

  login: Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Parameter email tidak sesuai format",
      "string.empty": "Parameter email tidak boleh kosong",
      "any.required": "Parameter email diperlukan",
    }),
    password: Joi.string().required().messages({
      "string.empty": "Parameter password tidak boleh kosong",
      "any.required": "Parameter password diperlukan",
    }),
  }),
};

export default membershipSchemas;
