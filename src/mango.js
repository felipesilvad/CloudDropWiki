import axios from 'axios';

class Mongo {
  // static accessToken = localStorage.getItem("mongoAccessToken");
  // static projectId = localStorage.getItem("mongoProjectId");
  // static provider = localStorage.getItem("mongoProvider");
  // static region = localStorage.getItem("mongoRegion");

  // // static #authUrl = () =>
  // //   `https://sa-east-1.aws.data.mongodb-api.com/app/data-wzzmwsl/endpoint/data/v1/action/find`;
  // static #apiUrl = (action) =>
  //   `https://sa-east-1.aws.data.mongodb-api.com/app/data-wzzmwsl/endpoint/data/v1/action/${action}`;
  // static #authHeaders = () => ({
  //   "Access-Control-Request-Headers": "*",
  //   Accept: "application/json",
  //   // Authorization: `Bearer ${Mongo.accessToken}`,
  //   "Content-Type": "application/json",
  // });

  // static ready() {
  //   return !!Mongo.projectId && !!Mongo.provider && !!Mongo.region;
  // }

  // static async fakeAuth(collection = "images") {
  //   return Mongo.find(collection, { limit: 1 })
  //     .then(async (response) => {
  //       localStorage.setItem("mongoProjectId", Mongo.projectId);
  //       localStorage.setItem("mongoProvider", Mongo.provider);
  //       localStorage.setItem("mongoRegion", Mongo.region);
  //       return response;
  //     })
  //     .catch((e) => {
  //       console.error("Mongo.fakeAuth: ", e);
  //       return false;
  //     });
  // }

  // static async auth(username, password) {
  //   return fetch(Mongo.#authUrl(), {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ username, password }),
  //   })
  //     .then(async (response) => {
  //       if (response.ok) {
  //         let responseJson = await response.json();
  //         Mongo.accessToken = responseJson.access_token;
  //         localStorage.setItem("mongoAccessToken", Mongo.accessToken);
  //         localStorage.setItem("mongoProjectId", Mongo.projectId);
  //         localStorage.setItem("mongoProvider", Mongo.provider);
  //         localStorage.setItem("mongoRegion", Mongo.region);
  //         return responseJson;
  //       } else {
  //         console.error("Mongo.auth: ", response);
  //         return false;
  //       }
  //     })
  //     .catch((e) => {
  //       console.error("Mongo.auth: ", e);
  //       return false;
  //     });
  // }

  static async find(collection, data) {
    if (data?.filter?._id) data.filter._id = { $oid: data.filter._id };

    return axios({method: 'post',url: "https://sa-east-1.aws.data.mongodb-api.com/app/data-wzzmwsl/endpoint/data/v1/action/find",
      data: {
        "collection":collection,
        "database":"soc",
        "dataSource":"Sword",
        ...data,
      }
    })

    // return fetch(Mongo.#apiUrl("find"), {
    //   method: "POST",
    //   headers: Mongo.#authHeaders(),
    //   body: JSON.stringify({
    //     dataSource: "lwd",
    //     database: "lwd",
    //     collection: collection,
    //     limit: 50000,
    //     ...data,
    //   }),
    // }).then(async (response) => {
    //   if (response.ok) {
    //     return response.json();
    //   } else {
    //     let error = await response.json();
    //     console.error(`Mongo.find: ${error}`);
    //     throw error;
    //   }
    // });
  }

  static async insert(collection, data) {
    let createdAt = new Date().toJSON();

    return axios({method: 'post',url: "https://sa-east-1.aws.data.mongodb-api.com/app/data-wzzmwsl/endpoint/data/v1/action/insertOne",
      data: {
        "collection":collection,
        "database":"soc",
        "dataSource":"Sword",
        "document": {
          "createdAt": createdAt,
          ...data
        }
      }
    })
  }

  static async update(collection, id, data) {
    let updatedAt = new Date().toJSON();

    
    return axios({method: 'post',url: "https://sa-east-1.aws.data.mongodb-api.com/app/data-wzzmwsl/endpoint/data/v1/action/updateOne",
      data: {
        "dataSource": "Sword",
        "database": "soc",
        "collection": collection,
        "filter": {
          "_id": { "$oid": id}
        },
        "update": {
          "$set": {
            "updatedAt": updatedAt,
            ...data
          }
        }
    }})
  }

  // static async update(collection, filter, update) {
  //   if (filter._id) filter._id = { $oid: filter._id };

  //   let updatedAt = new Date().toJSON();
  //   if (!update.$set) update.$set = {};
  //   update.$set = { ...update.$set, updatedAt };

  //   return fetch(Mongo.#apiUrl("updateMany"), {
  //     method: "POST",
  //     headers: Mongo.#authHeaders(),
  //     body: JSON.stringify({
  //       dataSource: "lwd",
  //       database: "lwd",
  //       collection,
  //       filter,
  //       update,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       if (responseJson.modifiedCount > 0) {
  //         return responseJson;
  //       } else {
  //         console.warn(`Mongo.update: No matches found`);
  //         throw `Mongo.update: No matches found`;
  //       }
  //     });
  // }

  // static async delete(collection, filter) {
  //   if (filter._id) filter._id = { $oid: filter._id };

  //   return fetch(Mongo.#apiUrl("deleteMany"), {
  //     method: "POST",
  //     headers: Mongo.#authHeaders(),
  //     body: JSON.stringify({
  //       dataSource: "lwd",
  //       database: "lwd",
  //       collection,
  //       filter,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       if (responseJson.deletedCount > 0) {
  //         return responseJson;
  //       } else {
  //         console.warn(`Mongo.delete: No matches found`);
  //         throw `Mongo.delete: No matches found`;
  //       }
  //     });
  // }
}

export default Mongo;