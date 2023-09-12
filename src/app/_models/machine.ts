export interface IMachine {
  id: number
  name: string
  capacityInPercent: number,
  createdAt: Date,
  imageUrl: string | undefined,
  manufacturerId: number,
  purchasedAt: Date
  status: string,
  updatedAt: Date,
  yearOfManufacture: number,
}
