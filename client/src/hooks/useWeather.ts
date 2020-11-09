import { useState, useEffect } from 'react'
import Weather from '../utils/GMap'


function useWeather() {
    const [weather, setWeather] = useState<any>({})
    useEffect(() => {
        async function fetch() {
            const weather = new Weather({ key: 'b685289e8ee451b93294731fb738def2' })
            weather.getWeather({
                success(res) {
                    setWeather(res)
                },
                fail(err) {
                    console.log(err)
                }
            })
        }
        fetch()
    }, [])
    return {
        weather
    }
}
export default useWeather
