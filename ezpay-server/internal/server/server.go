package server

import (
	"fmt"
	"os"
	"github.com/joho/godotenv"
	"log"
	"github.com/gin-gonic/gin"
)

func StartServer(){

	router := gin.Default();

	if godotenv.Load()!=nil{
		err := godotene.Load()
		log.Fatalf("Fatal error in getting the .env variables"+err)
	}

	host := os.Getenv("HOST")
	port := os.Getenv("PORT")

	addr := host+":"+port

	//services - routes(specifications) - handlers (file operations)

	fmt.Println("Sever runs at",addr)

	router.Run(addr)	
}

