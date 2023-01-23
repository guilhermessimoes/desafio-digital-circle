package models

import "gorm.io/gorm"

type Tb01 struct {
	id        int64   `gorm:"primary key;autoIncrement" json:"id"`
	col_texto *string `json:"col_texto"`
	col_dt    *string `json:"col_dt"`
}

func MigrateTb01(db *gorm.DB) error {
	err := db.AutoMigrate(&Tb01{})
	return err
}
