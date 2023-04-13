/*** Pasword Vissible Buttons***/
$(".show-pass-btn").click(function () {
  $(this).find(".fa").toggleClass("fa-eye fa-eye-slash");
  var input = $(".pass-input");
  if (input.attr("type") === "password") {
    input.attr("type", "text");
  } else {
    input.attr("type", "password");
  }
});

$(".show-cur-pass-btn").click(function () {
  $(this).find(".fa").toggleClass("fa-eye fa-eye-slash");
  var input = $(".cur-pass-input");
  if (input.attr("type") === "password") {
    input.attr("type", "text");
  } else {
    input.attr("type", "password");
  }
});

$(".show-new-pass-btn").click(function () {
  $(this).find(".fa").toggleClass("fa-eye fa-eye-slash");
  var input = $(".new-pass-input");
  if (input.attr("type") === "password") {
    input.attr("type", "text");
  } else {
    input.attr("type", "password");
  }
});

$(".show-cnfrm-pass-btn").click(function () {
  $(this).find(".fa").toggleClass("fa-eye fa-eye-slash");
  var input = $(".cnfrm-pass-input");
  if (input.attr("type") === "password") {
    input.attr("type", "text");
  } else {
    input.attr("type", "password");
  }
});

// $(document).ready(function () {
//   $("input:radio").click(function () {
//     //alert("clicked");
//     if ($(this).val() == "other") {
//       $("#textarea").removeClass("d-none");
//     } else {
//       $("#textarea").addClass("d-none");
//     }
//   });

//   $(".modal").on("shown.bs.modal", function () {
//     $("body").addClass("modal-open");
//   });

//   $(".modal").on("hidden.bs.modal", function (event) {
//     $("body").removeClass("modal-open");
//   });

//   let dis_radios = document.querySelectorAll(".radio-ss");

//   for (let i = 0; i < dis_radios.length; i++) {
//     let radio_here = dis_radios[i];

//     radio_here.addEventListener("click", function () {
//       for (let j = 0; j < dis_radios.length; j++) {
//         dis_radios[
//           j
//         ].parentElement.nextElementSibling.children[0].disabled = true;
//       }
//       this.parentElement.nextElementSibling.children[0].disabled = false;
//     });
//   }

//   $(".dataTables_filter input").attr("placeholder", "Search");
// });

/*modal click change start here*/

$(function () {
  $(".show-btn-1").click(function () {
    $(this).find(".fa").toggleClass("fa-eye fa-eye-slash");
    var input = $(".show-input-1");
    if (input.attr("type") === "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  });

  $(".show-btn-2").click(function () {
    $(this).find(".fa").toggleClass("fa-eye fa-eye-slash");
    var input = $(".show-input-2");
    if (input.attr("type") === "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  });

  $(".show-btn-3").click(function () {
    $(this).find(".fa").toggleClass("fa-eye fa-eye-slash");
    var input = $(".show-input-3");
    if (input.attr("type") === "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  });
});
