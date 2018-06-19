export const sortLastActive = (comments)=>{
  const map = {}
  const c = [...comments]
  for (let i=0, l=c.length; i<l;i++){
    if(map[c[i].email]){
      if(new Date(c[i].createdAt) > new Date(map[c[i].email])){
        map[c[i].email] = c[i].createdAt
      }
    }else{
      map[c[i].email] = c[i].createdAt
    }
  }
  return c.map(c=>{
    c.lastActive = map[c.email]
    return c
  })
}