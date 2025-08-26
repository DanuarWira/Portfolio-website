package db

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

func ConnectDB() *sql.DB {
	connStr := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", HOSTDB, UPORT, UNAMEDB, PASSDB, DBNAME)
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatalf("Gagal membuka koneksi database: %v", err)
	}
	err = db.Ping()
	if err != nil {
		log.Fatalf("Gagal terhubung ke database: %v", err)
	}
	log.Println("Berhasil terhubung ke database")
	return db
}
