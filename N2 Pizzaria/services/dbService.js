import * as SQLite from 'expo-sqlite';

export function getDbConnection() {
    const cx = SQLite.openDatabase('dbPizzaria.db');
    return cx;
};

//#region Products

export async function createTableProduct() {
    return new Promise((resolve, reject) => {
        const query = `CREATE TABLE IF NOT EXISTS tbProduct
        (
            Id integer primary key autoincrement,
            Code text not null,
            Description text not null,
            UnitValue decimal(10,2) null,
            CategoryId INTEGER NOT NULL,      
            FOREIGN KEY (CategoryId) REFERENCES tbCategory (Id)
        )`;

        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query);
            resolve(true);
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    });
};

export async function deleteTableProduct() {
    return new Promise((resolve, reject) => {
        const query = `DROP TABLE IF EXISTS tbProduct`;

        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query);
            resolve(true);
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    });
};

export function getAllProducts() {

    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = `SELECT p.Id, Code, p.Description, p.UnitValue, c.Id AS 'CategoryId', c.Description AS 'Category' 
            FROM tbProduct AS p 
            INNER JOIN tbCategory AS c ON c.Id = p.CategoryId `;
            tx.executeSql(query, [],
                (tx, registros) => {

                    var retorno = []

                    for (let n = 0; n < registros.rows.length; n++) {
                        let obj = {
                            id: registros.rows.item(n).Id,
                            code: registros.rows.item(n).Code,
                            description: registros.rows.item(n).Description.toUpperCase(),
                            unitValue: registros.rows.item(n).UnitValue.toFixed(2),
                            categoryId: registros.rows.item(n).CategoryId,
                            category: registros.rows.item(n).Category.toUpperCase()
                        }
                        retorno.push(obj);
                    }
                    resolve(retorno);
                })
        },
            error => {
                console.log('getAll ' + error);
                resolve([]);
            }
        )
    }
    );
};

export function getFilteredProducts(choosedFilter) {

    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = `SELECT p.Id, Code, p.Description, p.UnitValue, c.Id AS 'CategoryId', c.Description AS 'Category' 
            FROM tbProduct AS p 
            INNER JOIN tbCategory AS c ON c.Id = p.CategoryId 
            WHERE c.Id = ?`;
            tx.executeSql(query, [choosedFilter],
                (tx, registros) => {

                    var retorno = []

                    for (let n = 0; n < registros.rows.length; n++) {
                        let obj = {
                            id: registros.rows.item(n).Id,
                            code: registros.rows.item(n).Code,
                            description: registros.rows.item(n).Description.toUpperCase(),
                            unitValue: registros.rows.item(n).UnitValue.toFixed(2),
                            categoryId: registros.rows.item(n).CategoryId,
                            category: registros.rows.item(n).Category.toUpperCase()
                        }
                        retorno.push(obj);
                    }
                    resolve(retorno);
                })
        },
            error => {
                console.log(error);
                resolve([]);
            }
        )
    }
    );
};

export function newProduct(product) {

    return new Promise((resolve, reject) => {
        let query = 'insert into tbProduct (id, code, description, unitValue, categoryid) values (?,?,?,?,?)';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [product.id, product.code, product.description, product.unitValue, product.category],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log('saving ' + error);
                resolve(false);
            }
        )
    }
    );
};

export function editProduct(product) {
    return new Promise((resolve, reject) => {
        let query = 'update tbProduct set code=?, description=?, unitValue=?, categoryId=? where id=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [product.code, product.description, product.unitValue, product.category, product.id],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
};

export function deleteProduct(id) {
    return new Promise((resolve, reject) => {
        let query = 'delete from tbProduct where id=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [id],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log('Error on delete product: ' + error);
                resolve(false);
            }
        )
    }
    );
};

//#endregion

//#region Category

export async function createTableCategory() {
    return new Promise((resolve, reject) => {
        const query = `CREATE TABLE IF NOT EXISTS tbCategory
        (
            id integer primary key autoincrement,
            description text not null    
        )`;

        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query);
            resolve(true);
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    });
};

export async function deleteTableCategory() {
    return new Promise((resolve, reject) => {
        const query = `DROP TABLE IF EXISTS tbCategory`;

        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query);
            resolve(true);
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    });
};

export function getAllCategory() {

    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = 'select * from tbCategory';
            tx.executeSql(query, [],
                (tx, registros) => {

                    var retorno = []

                    for (let n = 0; n < registros.rows.length; n++) {
                        let obj = {
                            id: registros.rows.item(n).id,
                            description: registros.rows.item(n).description.toUpperCase()
                        }
                        retorno.push(obj);
                    }
                    resolve(retorno);
                })
        },
            error => {
                console.log(error);
                resolve([]);
            }
        )
    }
    );
};

export function getAllCategoryForDropDown() {

    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = 'select * from tbCategory';
            tx.executeSql(query, [],
                (tx, registros) => {

                    var retorno = []

                    for (let n = 0; n < registros.rows.length; n++) {
                        let obj = {
                            value: registros.rows.item(n).id,
                            label: registros.rows.item(n).description.toUpperCase()
                        }
                        retorno.push(obj);
                    }
                    resolve(retorno);
                })
        },
            error => {
                console.log(error);
                resolve([]);
            }
        )
    }
    );
};

export function newCategory(category) {

    return new Promise((resolve, reject) => {
        let query = 'insert into tbCategory (id, description) values (?,?)';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [category.id, category.description],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
};

export function editCategory(category) {
    return new Promise((resolve, reject) => {
        let query = 'update tbCategory set description=? where id=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [category.description, category.id],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
};

export function deleteCategory(id) {
    return new Promise((resolve, reject) => {
        let query = 'delete from tbCategory where id=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [id],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log('Error on delete product: ' + error);
                resolve(false);
            }
        )
    }
    );
};

//#endregion

//#region Orders

export async function createTableOrder() {
    return new Promise((resolve, reject) => {
        const query = `
        CREATE TABLE IF NOT EXISTS tbOrder 
        (
            Id INTEGER PRIMARY KEY AUTOINCREMENT,
            Username text not null,
            [Date] DATE NOT NULL
        )    
        `;

        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query);
            resolve(true);
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    });
};

export async function deleteTableOrder() {
    return new Promise((resolve, reject) => {
        const query = `DROP TABLE IF EXISTS tbOrder`;

        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query);
            resolve(true);
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    });
};

export async function createTableProductOrder() {
    return new Promise((resolve, reject) => {
        const query = `
        CREATE TABLE IF NOT EXISTS tbOrderProduct (
            Id INTEGER PRIMARY KEY AUTOINCREMENT,
            OrderId INTEGER NOT NULL,
            ProductId INTEGER NOT NULL,
            ProductQuantity INTEGER NOT NULL,
            FOREIGN KEY (OrderId) REFERENCES tbOrder(Id),
            FOREIGN KEY (ProductId) REFERENCES tbProduct(Id)
        )        
        `;

        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query);
            resolve(true);
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    });
};

export async function deleteTableProductOrder() {
    return new Promise((resolve, reject) => {
        const query = `DROP TABLE IF EXISTS tbOrderProduct 
        `;

        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query);
            resolve(true);
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    });
};

export function getAllOrders() {

    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = `SELECT o.*, p.Description, op.ProductQuantity, p.UnitValue FROM tbOrder o
            INNER JOIN tbOrderProduct op ON op.OrderId = o.Id
            INNER JOIN tbProduct p ON p.Id = op.ProductId
            `;

            tx.executeSql(query, [],
                (tx, registros) => {

                    var retorno = []

                    for (let n = 0; n < registros.rows.length; n++) {
                        let obj = {
                            id: registros.rows.item(n).Id,
                            user: registros.rows.item(n).Username.toUpperCase(),
                            date: registros.rows.item(n).Date.toUpperCase(),
                            product: registros.rows.item(n).Description.toUpperCase(),
                            productQty: registros.rows.item(n).ProductQuantity,
                            productUnitValue: registros.rows.item(n).UnitValue
                        }
                        retorno.push(obj);
                    }

                    resolve(retorno);
                })
        },
            error => {
                console.log(error);
                resolve([]);
            }
        )
    }
    );
};

export function newOrder(order) {

    return new Promise((resolve, reject) => {
        let query = `insert into tbOrder (id, username, date) values (?,?, DATE('now')) 
        `;
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [order.id, order.user],
                (tx, resultado) => {
                    resolve(resultado.insertId);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
};

export function newProductOrder(item) {

    return new Promise((resolve, reject) => {
        let query = `insert into tbOrderProduct (id, orderId, productId, productQuantity) values (?,?,?,?)`;
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [item.id, item.orderId, item.productId, item.productQty],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
};

//#endregion