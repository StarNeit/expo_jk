import axios from "axios";
import getEnvVars from "~config/env";

axios.defaults.baseURL = getEnvVars().bloomUrl;
