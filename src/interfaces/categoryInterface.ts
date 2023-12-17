export default interface Category {
  _id: string
  name: string
  description: string
  image: {
    public_id: string
    url: string
  }
}
