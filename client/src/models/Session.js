export class Session{
  constructor(data){
    this.id = data.id
    this.accountId = data.accountId
    this.localDate = data.localDate
    // this.localDate2 = new Date(data.localDate).toLocaleDateString('en-CA') // This is currently only being used to display in the editSessionModal. Later make this only part of an extension of Session model?
  }
}