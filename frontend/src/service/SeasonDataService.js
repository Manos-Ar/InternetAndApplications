import axios from 'axios'

const INSTRUCTOR = '2017/PF/Pts/5'
const COURSE_API_URL = 'http://localhost:8080'
const INSTRUCTOR_API_URL = `${COURSE_API_URL}/${INSTRUCTOR}`

class SeasonDataService {

    retrieveAllSeasons(name) {
      fetch(`${INSTRUCTOR_API_URL}`,{
        method: 'GET',
      })
      .then((response) =>{
        console.log(response.status, response.statusText);
        if (!response.ok) {
					throw Error(response.statusText);
					// DO SOMETHING
				}
				else {
					return response.json();
				}
			})
      .then(
				(json) => {
					console.log('json = ', json)
        }
      )
      }
      // var a = axios.get(`${INSTRUCTOR_API_URL}`);
      // // console.log(a);
      //   return a;
    }

export default new SeasonDataService()
