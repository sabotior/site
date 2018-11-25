function valid (form) {
  let fail = false;
  let username = form.username.value;
  let password = form.password.value;
  if(username==""|| username == " ")
  fail = "Введите имя";
  else if(password =="")
  fail = "Введите пароль";
  if(fail)
  alert(fail);
  else window.location = "index.html";
}