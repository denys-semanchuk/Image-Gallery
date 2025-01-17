export const saveImageToPublic = async (file: File): Promise<string> => {
  try {
    const fileName = `image_${Date.now()}_${file.name}`;
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    return `/images/${fileName}`;
  } catch (error) {
    console.error("Error saving image:", error);
    throw error;
  }
};

export const images = [
  {
    id: 1,
    title: "Mountain Meadow with Wildflowers",
    src: "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg?w=2210&quality=70",
    category: ["nature"],
  },
  {
    id: 2,
    title: "Dense Forest Pathway",
    src: "https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/w/o/WOPA160517_D056-resized.jpg?crop=864%2C0%2C1728%2C2304&wid=600&hei=800&scl=2.88",
    category: ["nature"],
  },
  {
    id: 3,
    title: "Sunset Valley Panorama",
    src: "https://static.vecteezy.com/system/resources/thumbnails/024/669/489/small_2x/mountain-countryside-landscape-at-sunset-dramatic-sky-over-a-distant-valley-green-fields-and-trees-on-hill-beautiful-natural-landscapes-of-the-carpathians-generative-ai-variation-5-photo.jpeg",
    category: ["nature"],
  },
  {
    id: 4,
    title: "Coastal Shoreline at Dawn",
    src: "https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/TNC_PC2021_3e5655d574ae2c0b9498e2c2824db2c7-original.JPG?crop=409%2C0%2C2181%2C1200&wid=4000&hei=2200&scl=0.5454545454545454",
    category: ["nature"],
  },
  {
    id: 5,
    title: "Modern Glass Architecture",
    src: "https://aul.edu.ng/static/images/reviews/architecture3.jpg",
    category: ["architecture"],
  },
  {
    id: 27,
    title: "Misty Mountain Landscape",
    src: "https://hips.hearstapps.com/hmg-prod/images/nature-quotes-landscape-1648265299.jpg",
    category: ["nature"],
  },
  {
    id: 28,
    title: "Portrait in Natural Light",
    src: "https://www.psychologue.net/site/article/66683/55668/que-est-ce-que-people-pleaser_ai1.jpg",
    category: ["people"],
  },
  {
    id: 29,
    title: "Alpine Lake Reflection",
    src: "https://images.squarespace-cdn.com/content/v1/5feb6d2cab06677bba637eba/1678905323964-FSN7YA7WOQFDF57T7IQ2/LAM+images+%284%29.jpg",
    category: ["nature"],
  },
  {
    id: 30,
    title: "Forest Trail Explorer",
    src: "https://cdn.mos.cms.futurecdn.net/2gHPhDWjds5q8nqLM2FG9Y-1200-80.jpg",
    category: ["people"],
  },
  {
    id: 31,
    title: "Snow-Capped Mountain Peak",
    src: "https://images.stockcake.com/public/4/0/c/40cc5bc3-7332-4470-ac1e-4325c947131d_large/snow-capped-mountain-peak-stockcake.jpg",
    category: ["nature"],
  },
  {
    id: 6,
    title: "Nature Image",
    src: "https://www.bsr.org/images/heroes/bsr-focus-nature-hero.jpg",
    category: ["nature"],
  },
  {
    id: 7,
    title: "Nature Image",
    src: "https://imgcdn.stablediffusionweb.com/2024/9/6/2fcfe7ed-36f3-4b43-af73-58e30254e515.jpg",
    category: ["nature"],
  },
  {
    id: 8,
    title: "Nature Image",
    src: "https://www.insidewink.com/wp-content/uploads/2020/04/Jean_Trebek_Beauty_in_Nature.jpg",
    category: ["nature"],
  },
  {
    id: 9,
    title: "Nature Image",
    src: "https://www.airzen.fr/wp-content/uploads/2022/03/misty-morning-scene-of-lacu-rosu-lake-foggy-summer-sunrise-in-harghita-county-romania-europe-beauty-of-nature-concept-background-stockpack-adobe-stock-scaled.jpg",
    category: ["nature"],
  },
  {
    id: 10,
    title: "Nature Image",
    src: "https://www.garn.org/wp-content/uploads/2020/10/1-1.jpg",
    category: ["nature"],
  },
  {
    id: 11,
    title: "Nature Image",
    src: "https://media.istockphoto.com/id/1472932742/photo/group-of-multigenerational-people-hugging-each-others-support-multiracial-and-diversity.jpg?s=612x612&w=0&k=20&c=Zm1MthU_G_LzfjBFBaMORRnuBhMsCjPQ38Ksfg4zl9g=",
    category: ["people"],
  },
  {
    id: 12,
    title: "Nature Image",
    src: "https://cdn.prod.website-files.com/665deca12b351fdb8e748bf9/6662dd13f923dbac094d6f3d_base-architecture.webp",
    category: ["architecture"],
  },
  {
    id: 13,
    title: "Nature Image",
    src: "https://www.bluentcad.com/images/style-architecture.webp",
    category: ["architecture"],
  },
  {
    id: 14,
    title: "Nature Image",
    src: "https://www.insidewink.com/wp-content/uploads/2020/04/Jean_Trebek_Beauty_in_Nature.jpg",
    category: ["nature"],
  },
  {
    id: 15,
    title: "Nature Image",
    src: "https://www.quickanddirtytips.com/wp-content/uploads/2022/05/ezgif.com-gif-maker-3.jpg",
    category: ["people"],
  },
  {
    id: 16,
    title: "Nature Image",
    src: "https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Zugpsitze_mountain.jpg?crop=0%2C176%2C3008%2C1654&wid=4000&hei=2200&scl=0.752",
    category: ["nature"],
  },
  {
    id: 17,
    title: "Nature Image",
    src: "https://media.licdn.com/dms/image/v2/C561BAQExLW4Wf3dVAA/company-background_10000/company-background_10000/0/1595001413975/all_about_people_cover?e=2147483647&v=beta&t=iwOLY0m5juPf07tFeobEgfj8n0m7ddJL5WOkIseZYTE",
    category: ["people"],
  },
  {
    id: 18,
    title: "Nature Image",
    src: "https://images.squarespace-cdn.com/content/v1/56bf55504c2f85a60a9b9fe5/1456231613139-3KO3N91YNQHPIRMV8KOU/SnowyRangeSunrise.jpg",
    category: ["nature"],
  },
  {
    id: 19,
    title: "Nature Image",
    src: "https://img.freepik.com/free-photo/people-posing-together-registration-day_23-2149096794.jpg",
    category: ["people"],
  },
  {
    id: 20,
    title: "Nature Image",
    src: "https://cloudlearn.co.uk/pix/uploaded/news/301980_20d30d.jpg",
    category: ["architecture"],
  },
  {
    id: 21,
    title: "Nature Image",
    src: "https://www.lbl.gov/wp-content/uploads/2022/08/People_heroXBD201909-00859018.jpg",
    category: ["people"],
  },
  {
    id: 22,
    title: "Nature Image",
    src: "https://assets.weforum.org/article/image/mFbB6RYJ_KC15YTzt7cC-K4JXTsjsNT3F315xr283_4.jpg",
    category: ["nature"],
  },
  {
    id: 23,
    title: "Nature Image",
    src: "https://images.ctfassets.net/6bj3xgxxnl0k/1nmRcnMDePlT1JY3UVfXOf/cbcd22ed3b3dfe9affa432031b911145/AdobeStock_472119374.jpeg?fm=webp",
    category: ["people"],
  },
  {
    id: 24,
    title: "Nature Image",
    src: "https://cdn.outsideonline.com/wp-content/uploads/2023/06/hiker-waterfall-nature_s.jpg",
    category: ["nature"],
  },
  {
    id: 25,
    title: "Nature Image",
    src: "https://i0.wp.com/picjumbo.com/wp-content/uploads/magical-spring-forest-scenery-during-morning-breeze-free-photo.jpg?w=600&quality=80",
    category: ["people"],
  },
  {
    id: 26,
    title: "Nature Image",
    src: "https://onetreeplanted.org/cdn/shop/articles/nature_facts_1600x.jpg?v=1705008496",
    category: ["nature"],
  },
];
