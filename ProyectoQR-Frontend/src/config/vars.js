
class Vars {

    constructor() {
    }
    // Getter
    getApi(){
        const api = `${process.env.REACT_APP_API_HOSTNAME}`;
      return api
    }

}

export default new Vars()