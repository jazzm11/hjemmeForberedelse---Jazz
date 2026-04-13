const Fox = require("../models/Fox");

const API_URL = process.env.FOX_IMG_API_URL;

// Hent to tilfeldige bilder fra API
exports.getRandomFox = async (req, res) => {
  try {
    const response1 = await fetch(API_URL);
    const data1 = await response1.json();
    const imageUrl1 = data1.image;

    const response2 = await fetch(API_URL);
    const data2 = await response2.json();
    const imageUrl2 = data2.image;

    res.render("index", {
      fox1: {
        imageUrl: imageUrl1,
        votes: 0,
      },
      fox2: {
        imageUrl: imageUrl2,
        votes: 0,
      },
      message: null,
    });

  } catch (error) {
    console.error("Feil ved henting av fox-bilde:", error);
    res.status(500).render("index", {
      fox1: null,
      fox2: null,
      message: "Kunne ikke hente bilder. Prøv igjen senere.",
    });
  }
};

// Registrer stemme (vinner får +1 stemme)
exports.voteFox = async (req, res) => {
  try {
    const { winnerUrl, loserUrl } = req.body;

    // sjekk at begge URL-er er tilstede
    if (!winnerUrl || !loserUrl) {
      return res.status(400).json({
        success: false,
        message: "Begge bilde-URLer er påkrevd",
      });
    }

    // Registrer søteste bilde
    let winnerFox = await Fox.findOne({ imageUrl: winnerUrl });
    if (!winnerFox) {
      winnerFox = new Fox({
        imageUrl: winnerUrl,
        votes: 1,
      });
    } else {
      winnerFox.votes += 1;
    }
    await winnerFox.save();

    // Registrer mindre søt bilde (valgfritt, bare for statistikk)
    let loserFox = await Fox.findOne({ imageUrl: loserUrl });
    if (!loserFox) {
      loserFox = new Fox({
        imageUrl: loserUrl,
        votes: 0,
      });
    }
    await loserFox.save();

    res.json({
      success: true,
      message: "Stemmen ble registrert.",
      votes: winnerFox.votes,
    });
  } catch (error) {
    console.error("Feil ved stemmegivning:", error);
    res.status(500).json({
      success: false,
      message: "Feil ved registrering av stemme",
    });
  }
};

// Hent to nye tilfeldige bilder (AJAX)
exports.getNewFox = async (req, res) => {
  try {
    const response1 = await fetch(API_URL);
    const data1 = await response1.json();

    const response2 = await fetch(API_URL);
    const data2 = await response2.json();

    res.json({
      success: true,
      imageUrl1: data1.image,
      imageUrl2: data2.image,
    });
  } catch (error) {
    console.error("Feil ved henting av nye bilder:", error);
    res.status(500).json({
      success: false,
      message: "Kunne ikke hente nye bilder",
    });
  }
};

exports.getStats = async (req, res) => {
  try {
    const foxes = await Fox.find().sort({ votes: -1 }).limit(20);
    res.render("stats", { foxes, message: null });
  } catch (error) {
    console.error("Feil ved henting av statistikk:", error);
    res.status(500).render("stats", {
        foxes: [],
        message: "Kunne ikke hente statistikk. Prøv igjen senere.",
    });
  }
};
