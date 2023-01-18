const dotenv = require("dotenv");
const joi = require("joi");
const path = require("path");

dotenv.config({ path: path.join(__dirname, '..',"/.env") });
console.log(__dirname,'env')
const envVarsSchema = joi
  .object()
  .keys({
    CLIENT_ID:joi.string().required(),
    CLOUD_INSTANCE: joi.string().required(),
    TENANT_ID:joi.string().required(),
    CLIENT_SECRET:joi.string().required(),
    REDIRECT_URI:joi.string().required(),
    })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    CLIENT_ID:envVars.CLIENT_ID,
    CLOUD_INSTANCE: envVars.CLOUD_INSTANCE,
    TENANT_ID:envVars.TENANT_ID,
    CLIENT_SECRET:envVars.CLIENT_SECRET,
    REDIRECT_URI:envVars.REDIRECT_URI,
};
