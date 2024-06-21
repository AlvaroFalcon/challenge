import {Button, Container, Grid} from "@mui/material";
import type {NextPage} from "next";
import Head from "next/head";
import {ThumbnailImage} from "../components/ThumbnailImage";
import {IVaultImage} from "../model/vaultImage";

export type VaultProps = {
  images: IVaultImage[]
};

const Vault: NextPage<VaultProps> = ({images}) => {
  return (
    <>
      <Head>
        <title>Fanvue - Vault - Check all your vault images</title>
      </Head>
      <main>
        <Container>
          <h1>Vault</h1>
          <Grid container spacing={2}>
            {images.map((image: IVaultImage) => (
              <Grid item key={`${image.id}_${image.albumId}`} xs={12} sm={6} md={4} >
                  <Button>
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
  const imageResponse = await fetch("https://jsonplaceholder.typicode.com/albums/1/photos");
  const images: IVaultImage[] = await imageResponse.json();
  return {
    props: {
      images: images
    },
  };
}

export default Vault;
