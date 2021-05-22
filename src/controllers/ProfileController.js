const Profile = require("../model/Profile");

module.exports = {
  index(req, res) {
    return res.render("profile", { profile: Profile.get() });
  },

  update(req, res) {
    //req.body para pegar os dados
    const data = req.body;

    //definir quantas semanas tem num ano: 52
    const weeksPerYear = 52;

    //remover as semanas de férias do ano
    const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;

    //quantas horas de trabalho por semana
    const weekTotalHours = data["hours-per-day"] * data["days-per-week"];

    //total de horas trabalhadas no mês
    const monthlyTotalHours = weekTotalHours * weeksPerMonth;

    //valor hora
    const valueHour = (data["value-hour"] =
      data["monthly-budget"] / monthlyTotalHours);

    // outra forma de fazer: Profile.data = data
    Profile.update({
      ...Profile.get(),
      ...req.body,
      "value-hour": valueHour,
    });
    return res.redirect("/profile");
  },
};
