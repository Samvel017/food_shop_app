export default function alertMessage(type, bool=true) {
  let block = document.createElement('div');
  block.classList.add('alert');
  bool == true
    ? (block.innerHTML = `Successfully added to ${type}!`)
    : (block.innerHTML = `You have successfully bought these products!
  `);

  document.body.append(block);
  setTimeout(() => {
    block.remove();
  }, 3000);
}
