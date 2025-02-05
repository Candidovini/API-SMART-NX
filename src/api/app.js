
import router from "../routes/Routes.js";
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

app.get('/healthz', async (req, res) => {
  try {
    res.status(200).json({
      message:"Service is running",
      timestamp: new Date().getTime()
    });
  } catch (error) {
    res.status(500).json({
      message:"Service is not running",
      timestamp: new Date().getTime()
    });
  }
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados foi bem-sucedida!');
    

  } catch (error) {
    console.error('❌ Não foi possível conectar ao banco de dados:', error);
  }
})();

export default app;