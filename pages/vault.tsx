import {Button, Container, Grid} from "@mui/material";
import type {NextPage} from "next";
import Head from "next/head";
import {useState} from "react";
import ImageDialog from "../components/ImageDialog";
import {ThumbnailImage} from "../components/ThumbnailImage";
import {IVaultImage} from "../model/vaultImage";

export type VaultProps = {
  images: IVaultImage[]
};
// In this file there are a couple of things that I would like to change:

// 1. I'm not sure if wraping the image into a Button does the job, its helpful
// since it inherits properties that enhances accessibility like tab index, if I had more time I'd like to implement those properties
// In my ThumbnailImage component

// 2. I would like to separate into another component the grid item, so I can reuse it in other components
// 3. The styling for grid items is responsive but I think is still not perfect, as Im not used to work with Material UI, I'd like to improve it
const Vault: NextPage<VaultProps> = ({images}) => {
  const [selectedImage, setSelectedImage] = useState<IVaultImage | null>(null);
  return (
    <>
      <Head>
        <title>Fanvue - Vault - Check all your vault images</title>
        <meta name={"description"} content={"Fanvue vault of images"}/>
        <meta name={"keywords"} content={"images, vault, gallery, album"}/>
        <meta name={"author"} content={"Fanvue"}/>

        <meta property="og:title" content="Fanvue - Vault gallery"/>
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://www.fanvue.com"/>
        <meta property="og:image" content="favicon.png"/>
      </Head>
      <main>
        <Container>
          <h1>Vault</h1>
          <ImageDialog open={selectedImage !== null}
                       onClose={() => setSelectedImage(null)}
                       image={selectedImage}/>
          <Grid container spacing={2}>
            {images.map((image: IVaultImage) => (
              <Grid item key={`${image.id}_${image.albumId}`} xs={12} sm={6}
                    md={4}>
                <Button onClick={() => setSelectedImage(image)}
                        aria-label={"Open image"}>
                <figure>
                    <ThumbnailImage
                      src={image.thumbnailUrl}
                      alt={image.title}
                      />
                      <figcaption>{image.title}</figcaption>
                    </figure>
                  </Button>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  );
};

export async function getServerSideProps() {
  // As there were multiple albums, I'm only using the first one
  const imageResponse = await fetch("https://jsonplaceholder.typicode.com/albums/1/photos");
  const images: IVaultImage[] = await imageResponse.json();
  return {
    props: {
      images: images
    },
  };
}

export default Vault;
