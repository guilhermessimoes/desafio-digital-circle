package main

import (
	"log"
	"net/http"
	"os"

	"github.com/akhil/go-fiber-postgres/models"
	"github.com/akhil/go-fiber-postgres/storage"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"gorm.io/gorm"
)

type Tb01 struct {
	ColText string `json:"col_text"`
	ColDt   string `json:"col_dt"`
}

type Repository struct {
	DB *gorm.DB
}

func (r *Repository) CreateTb01(context *fiber.Ctx) error {
	tb01 := Tb01{}

	err := context.BodyParser(&tb01)

	if err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"message": "falha na requisição."})
		return err
	}

	err = r.DB.Create(&tb01).Error
	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "Não foi possivel realizar o cadastro."})
		return err
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "Cadastro realizado com sucesso."})
	return nil
}

func (r *Repository) SetupRoutes(app *fiber.App) {
	api := app.Group("/api")
	api.Post("/tb01", r.CreateTb01)
}

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal(err)
	}
	config := &storage.Config{
		Host:     os.Getenv("DB_HOST"),
		Port:     os.Getenv("DB_PORT"),
		Password: os.Getenv("DB_PASS"),
		User:     os.Getenv("DB_USER"),
		SSLMode:  os.Getenv("DB_SSLMODE"),
		DBName:   os.Getenv("DB_NAME"),
	}

	db, err := storage.NewConnection(config)

	if err != nil {
		log.Fatal("Não foi possivel conectar com banco de dados.")
	}
	err = models.MigrateTb01(db)
	if err != nil {
		log.Fatal("Não foi possivel gerar a migrate.")
	}

	r := Repository{
		DB: db,
	}

	app := fiber.New()
	app.Use(cors.New())
	r.SetupRoutes(app)
	app.Listen(":9000")
}
