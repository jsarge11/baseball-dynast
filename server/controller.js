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

 },
 delete: (req, res) => {
   console.log(activeCards.length);
    activeCards.map((item, index, arr)=> {
    if (item.item.player.ID === req.params.id) {
      arr.splice(index, 1);
     }
  })

  res.status(200).send( activeCards );
 }

}