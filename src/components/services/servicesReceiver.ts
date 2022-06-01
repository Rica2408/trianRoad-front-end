import axios from "axios"

const URL = 'http://localhost:8080/receiver'

type ItemType = {
  id: string
  receiver: string
  readOnly?: boolean
}

type GetDestinationsType = {
  items: ItemType[]
}

export const getReceiversService = async (): Promise<ItemType[] | null> => {
  try {
    const response = await axios.get<GetDestinationsType>(URL)
    return response.data.items
  } catch (error) {
    console.log(error)
    return null
  }
}

export const addReceiverService =  async (receiver: string): Promise<ItemType | null> => {
  try {
    const response = await axios.post<ItemType>(URL, {
        receiver
    })

    return response.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const updateReceiverService = async (id: string, receiver: string): Promise<ItemType | null> => {
  try {
    const response = await axios.put<ItemType>(`${URL}/${id}`, {
      receiver
    })

    return response.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const deleteReceiverService = async (id: string): Promise<ItemType | null> => {
  try {
    const response = await axios.delete<ItemType>(`${URL}/${id}`)
    return response.data

  } catch (error) {
    console.log(error)
    return null
  }
}
