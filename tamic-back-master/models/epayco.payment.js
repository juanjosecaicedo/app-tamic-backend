const Sequelize = require("sequelize");
const db = require("../database/db.js");

module.exports = db.sequelize.define(
  "tbl_epayco_payments", {
    epayco_payment_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    x_cust_id_cliente: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_ref_payco: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_id_factura: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_id_invoice: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_description: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_amount: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_amount_country: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_amount_ok: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_tax: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_amount_base: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_currency_code: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_bank_name: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_cardnumber: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_quotas: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_respuesta: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_response: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_approval_code: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_transaction_id: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_fecha_transaccion: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_transaction_date: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_cod_respuesta: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_cod_response: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_response_reason_text: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_cod_transaction_stat: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_transaction_state: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_errorcode: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_franchise: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_business: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_customer_doctype: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_customer_document: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_customer_name: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_customer_lastname: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_customer_email: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_customer_phone: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_customer_movil: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_customer_ind_pais: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_customer_country: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_customer_city: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_customer_address: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_customer_ip: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_signature: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_test_request: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_extra1: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_extra2: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_extra3: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_extra4: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_extra5: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_extra6: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_extra7: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_extra8: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_extra9: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_extra10: {
      type: Sequelize.STRING,
      allowNull: true
    },
    x_type_payment: {
      type: Sequelize.STRING,
      allowNull: true
    },
    tbl_users_user_id: {
      type: Sequelize.STRING,
      allowNull: true
    },
    tbl_plans_plan_id: {
      type: Sequelize.STRING,
      allowNull: true
    },
    tbl_codes_code_id: {      
      type: Sequelize.STRING,
      allowNull: true,      
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    timestamps: false
  }
);
