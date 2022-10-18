function alertBuyCart() {
  (async () => {
    do {
      await Swal.fire({
        title: 'Datos de Envio <i class="fa-solid fa-truck-fast"></i>',
        html:
          '<input type="text" id="swal-input1" placeholder="Name and surname" class="swal2-input">' +
          '<input type="text" id="swal-input2" placeholder="Address" class="swal2-input">' +
          '<input type="text"id="swal-input3" placeholder="Flat/apartment" class="swal2-input">' +
          '<input type="number" id="swal-input4" placeholder="Phone number" class="swal2-input">',
        confirmButtonText: "Siguiente",
        confirmButtonColor: "#111",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
      });
      formFullName = document.getElementById("swal-input1").value;
      formAddress = document.getElementById("swal-input2").value;
      formFlat = document.getElementById("swal-input3").value;
      formPhone = document.getElementById("swal-input4").value;

      if (formFullName == "" || formAddress == "" || formPhone == "") {
        Toastify({
          text: "Error, Complete todos los campos",
          duration: 4000,
          gravity: "bottom",
          position: "left",
          style: {
            background: "#960f1a",
          },
        });
      }
    } while (formFullName == "" || formAddress == "" || formPhone == "");
    class ShippingInformation {
      constructor() {
        this.name = formFullName.toUpperCase();
        this.address = formAddress.toUpperCase();
        this.flat = formFlat.toUpperCase();
        this.phone = formPhone;
      }
    }
    let shipping = new ShippingInformation();
    shippingData = sessionStorage.setItem("shippingData", JSON.stringify(shipping));

    Swal.fire({
      title: `Your purchase is in process ${shipping.name}`,
      html: `<p class="ticket">you will receive it in ${shipping.address}</p>
                 <p class="ticket">The total to pay is $${localStorage.getItem(
                   "total"
                 )}</p>
                 <p>Do you want to continue?</p>`,
      icon: "question",
      confirmButtonText: "Ok",
      confirmButtonColor: "#960f1a",
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        let orderNumber = Math.round(Math.random() * 999999999);
        Swal.fire({
          title: "¡Thank you very much for your purchase!",
          html: `<p class="ticket">¡your purchase was successful!</p>
                     <p class="ticket">Order code: ${orderNumber}</p>`,
          icon: "success",
          timer: "10000",
          timerProgressBar: true,
          confirmButtonText: "Ok",
          confirmButtonColor: "#960f1a",
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
        });
        cleanCart();
      }
    });
  })();
}

function cartEmpty() {
  Swal.fire({
    title: "El carrito está vacío",
    icon: "warning",
    confirmButtonText: "OK",
  });
}

function alertAddCart() {
  Toastify({
    text: "Producto agregado al carrito",
    duration: 1500,
    gravity: "bottom",
    position: "left",
    style: {
      background: "#1f801f",
    },
  }).showToast();
}

function alertNewsletter() {
  Toastify({
    text: "Gracias por suscribirte a nuestro newsletter!",
    duration: 2000,
    gravity: "bottom",
    position: "left",
    style: {
      background: "#1f801f",
    },
  }).showToast();
}

function alertRemovedCart() {
  Toastify({
    text: "Producto eliminado del carrito",
    duration: 1500,
    gravity: "bottom",
    position: "left",
    style: {
      background: "#DF310C",
    },
  }).showToast();
}
