document.querySelector('button').addEventListener('click', getFetch)

function getFetch(userInput){
//   userInput = '011110038364'
    let inputVal = document.getElementById("barcode").value

    if(inputVal.length !==12){
        alert("Please ensure that barecode is 12 characters")
        return;
    } 

  const choice = userInput
//   document.querySelector('input').value
  const url = `https://world.openfoodfacts.org/api/v0/product/${inputVal}.json`


  class ProductInfo {
        constructor(productData){ // Passing in data.product
            this.name = productData.product_name
            this.ingredients = productData.ingredients
            this.image = productData.image_url
            }
        testCall(){
            console.log(this.ingredients)
        }

        showInfo(){
            document.getElementById('product-img').src=this.image
            document.getElementById('product-name').innerText=this.name
        }

        listIngredients() {
            let tableRef = document.getElementById('ingredient-table')

            // Clear table of previous data pulls
            // FYI-works without the i++ -- bc you're deleting a row, each row gets moved up to index row. If you DID increment, then you'd skip rows. Could also do a while loop.
            for(let i=1; i< tableRef.rows.length;){
                tableRef.deleteRow(i);
            }

            if(!(this.ingredients==null)){
                // Add ingredients from data pull
                for(let key in this.ingredients){
                    let newRow = tableRef.insertRow(-1) // Add to add of table
                    let newICell = newRow.insertCell(0) // Add new cell at index zero   
                    let newVCell = newRow.insertCell(1)
                    let newIText = document.createTextNode(this.ingredients[key].text)

                    let vegStatus = this.ingredients[key].vegetarian

                    if(vegStatus==null){ //null is checking for anything that is falsey, including 'undefined'
                        vegStatus='unknown'
                    }

                    let newVText = document.createTextNode(vegStatus)
                    
                    newICell.appendChild(newIText)
                    newVCell.appendChild(newVText)

                    if(vegStatus==='no'){
                        // turn item red
                        newVCell.classList.add('non-veg-item')

                    } else if (vegStatus==='unknown' || vegStatus==='maybe') {
                        // turn item yellow
                        newVCell.classList.add('unknown-maybe-item')
                    }
                }
            }


        }
    }

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)

        if(data.status===0){
            // document.querySelector('').innerText=data.status_verbose
            alert(`Product not found. Please try another.`)
        } else if (data.status===1){
            const item = new ProductInfo(data.product)
            item.showInfo()
            item.listIngredients()
        }
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

