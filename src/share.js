export const getShareData = async (props) => {
  if (props.query.s) {
    try {
      const res = await fetch('https://us-central1-electripe-746b0.cloudfunctions.net/getData?id=' + props.query.s)
      const data = await res.json()
      console.log(data)
      return {
        shareValues: data
      }
    } catch (e) {
      console.error(e)
      return {
        error: 'Loading data'
      }
    }
  } else {
    return {}
  }
}
