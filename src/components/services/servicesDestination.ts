import axios from "axios"

const URL = 'http://localhost:8080/destination'

type ItemType = {
  id: string
  destination: string
  readOnly?: boolean
}

type GetDestinationsType = {
  items: ItemType[]
}

export const getDestinationsService = async (): Promise<ItemType[] | null> => {
  try {
    const response = await axios.get<GetDestinationsType>(URL)
    return response.data.items
  } catch (error) {
    console.log(error)
    return null
  }
}

export const addDestiantionService =  async (destination: string): Promise<ItemType | null> => {
  try {
    const response = await axios.post<ItemType>(URL, {
      destination
    })

    return response.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const updateDestinationService = async (id: string, destination: string): Promise<ItemType | null> => {
  try {
    const response = await axios.put<ItemType>(`${URL}/${id}`, {
      destination
    })

    return response.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const deleteDestinationService = async (id: string): Promise<ItemType | null> => {
  try {
    const response = await axios.delete<ItemType>(`${URL}/${id}`)
    return response.data

  } catch (error) {
    console.log(error)
    return null
  }
}
