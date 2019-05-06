export interface ElementData {
  inValue: number
  outValue: number
  name: string
  unit: string
}

export interface ElementsHashMap {
  [key :string] :ElementData
}

export interface VolumeData {
  value: number
  unit: string
}