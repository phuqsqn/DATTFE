import axios from "axios";
import storageService from "./storage.service";

const baseURL = "http://localhost:5000/"
class HttpService {
  async get( uri, options = { headers: {}, params: {}, body: {} } ) {
    try {
      return await this.request( "GET", uri, options )
    } catch ( error ) {
      throw error
    }
  }
  async post( uri, options = { headers: {}, params: {}, body: {} } ) {
    try {
      return await this.request( "POST", uri, options )
    } catch ( error ) {
      throw error
    }
  }
  async patch( uri, options = { headers: {}, params: {}, body: {} } ) {
    try {
      return await this.request( "PATCH", uri, options )
    } catch ( error ) {
      throw error
    }
  }
  async delete( uri, options = { headers: {}, params: {}, body: {} } ) {
    try {
      return await this.request( "DELETE", uri, options )
    } catch ( error ) {
      throw error
    }
  }

  async request( method, uri, options = { headers: {}, params: {}, body: {} } ) {
    return await axios.request( {
      method: method,
      baseURL: baseURL,
      url: uri,
      headers: this.generateHeaders( options.headers ),
      params: options.params,
      data: options.body
    } )
  }

  generateHeaders( headerInfo ) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ storageService.get( "access_token" ) }`
    }
    if ( headerInfo ) {
      for ( const item of Object.keys( headers ) ) {
        headers[ item ] = headerInfo[ item ]
      }
    }
    return headers
  }
}
export default new HttpService()