let activeCards = [];
let id = 0;

module.exports = {

create: (req, res) => {
  activeCards.push(req.body);
  res.status(200).send( activeCards );
},
 read: (req, res) => {
   res.status(200).send( activeCards );
 },
 update: (req, res) => {
  let newArr = activeCards.slice();

  activeCards.map((item, index, arr) => {
    if (item.item.player.ID === req.params.id)
    {
      newArr[index].item.player.FirstName = req.body.textToAdd.textToAdd;
      newArr[index].item.player.LastName = '';
    }
  })
  
  res.status(200).send( newArr );
 },
 delete: (req, res) => {
   console.log(req.params)
    activeCards.map((item, index, arr)=> {
    if (item.item.player.ID === req.params.id) {
      arr.splice(index, 1);
     }
  })

  res.status(200).send( activeCards );
 }

}