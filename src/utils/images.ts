export const saveImageToPublic = async (file: File): Promise<string> => {
  try {
    const fileName = `image_${Date.now()}_${file.name}`;
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    return `/images/${fileName}`;
  } catch (error) {
    console.error('Error saving image:', error);
    throw error;
  }
};

export const images = [
  {
    id: 1,
    title: "Nature Image",
    src: "https://placehold.co/600x400",
    category: ["nature"],
  },
  {
    id: 2,
    title: "Nature Image",
    src: "https://placehold.co/600x400",
    category: ["nature"],
  },
  {
    id: 3,
    title: "Nature Image",
    src: "https://placehold.co/600x400",
    category: ["nature"],
  },
  {
    id: 4,
    title: "Nature Image",
    src: "https://placehold.co/600x400",
    category: ["nature"],
  },
  {
    id: 5,
    title: "Nature Image",
    src: "https://placehold.co/600x400",
    category: ["nature"],
  },
  {
    id: 6,
    title: "Nature Image",
    src: "https://placehold.co/600x400",
    category: ["nature"],
  },
  {
    id: 7,
    title: "Nature Image",
    src: "https://placehold.co/600x400",
    category: ["nature"],
  },
  {
    id: 8,
    title: "Nature Image",
    src: "https://placehold.co/600x400",
    category: ["nature"],
  },
  {
    id: 9,
    title: "Nature Image",
    src: "https://placehold.co/600x400",
    category: ["nature"],
  },
  {
    id: 10,
    title: "Nature Image",
    src: "https://placehold.co/600x400",
    category: ["nature"],
  },
  {
    id: 11,
    title: "Nature Image",
    src: "https://placehold.co/600x400",
    category: ["people"],
  },
  {
    id: 12,
    title: "Nature Image",
    src: "https://placehold.co/600x400",
    category: ["architecture"],
  },
  {
    id: 13,
    title: "Nature Image",
    src: "https://placehold.co/600x400",
    category: ["architecture"],
  },
  {
    id: 14,
    title: "Nature Image",
    src: "https://placehold.co/600x400",
    category: ["nature"],
  },
  {
    id: 15,
    title: "Nature Image",
    src: "https://placehold.co/600x400",
    category: ["people"],
  },
  {
    id: 16,
    title: "Nature Image",
    src: "https://placehold.co/600x400",
    category: ["nature"],
  },
  {
    id: 17,
    title: "Nature Image",
    src: "https://placehold.co/600x400",
    category: ["people"],
  },
  {
    id: 18,
    title: "Nature Image",
    src: "https://placehold.co/600x400",
    category: ["nature"],
  },
  {
    id: 19,
    title: "Nature Image",
    src: "https://placehold.co/600x400",
    category: ["people"],
  },
  {
    id: 20,
    title: "Nature Image",
    src: "https://placehold.co/600x400",
    category: ["architecture"],
  },
  {
    id: 21,
    title: "Nature Image",
    src: "https://placehold.co/600x400",
    category: ["people"],
  },
  {
    id: 22,
    title: "Nature Image",
    src: "https://placehold.co/600x400",
    category: ["nature"],
  },
  {
    id: 23,
    title: "Nature Image",
    src: "https://placehold.co/600x400",
    category: ["people"],
  },
  {
    id: 24,
    title: "Nature Image",
    src: "https://placehold.co/600x400",
    category: ["nature"],
  },
  {
    id: 25,
    title: "Nature Image",
    src: "https://placehold.co/600x400",
    category: ["people"],
  },
  {
    id: 26,
    title: "Nature Image",
    src: "https://placehold.co/600x400",
    category: ["nature"],
  },
  {
    id: 27,
    title: "Nature Image",
    src: "https://placehold.co/600x400",
    category: ["nature"],
  },
  {
    id: 28,
    title: "Nature Image",
    src: "https://placehold.co/600x400",
    category: ["people"],
  },
  {
    id: 29,
    title: "Nature Image",
    src: "https://placehold.co/600x400",
    category: ["nature"],
  },
  {
    id: 30,
    title: "Nature Image",
    src: "https://placehold.co/600x400",
    category: ["people"],
  },
  {
    id: 31,
    title: "Nature Image",
    src: "https://placehold.co/600x400",
    category: ["nature"],
  },
];
