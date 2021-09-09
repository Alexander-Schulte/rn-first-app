import client from "./client";

const getEndpoint = "/service.php";
const postEndpoint = "/PostCourt.php";

const getListings = () => client.get(getEndpoint);

export const addListing = (listing, onUploadProgress) => {
  const data = new FormData();
  data.append("title", listing.title);
  data.append("price", listing.price);
  data.append("categoryId", listing.category.value);
  data.append("description", listing.description);
  data.append("images", listing.images);

  // listing.images.forEach((image, index) =>
  //   data.append("images", {
  //     name: "image" + index,
  //     type: "image/jpeg",
  //     uri: image,
  //   })
  // );
  if (listing.location)
    data.append("location", JSON.stringify(listing.location));

  console.log(data);
  return client.post(postEndpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  addListing,
  getListings,
};
