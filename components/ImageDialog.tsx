import {
  AppBar, Button, Dialog, DialogContent, Toolbar, Typography
} from "@mui/material";
import {IVaultImage} from "../model/vaultImage";
import {FullScreenImage} from "./FullScreenImage";

type ImageDialogProps = {
  image: IVaultImage | null
  onClose: () => void;
  open: boolean;
}

function ImageDialog({open, onClose, image}: ImageDialogProps) {
  return(
    <Dialog fullScreen open={open} onClose={onClose}>
      <AppBar sx={{background: "#000000", position: "relative"}}>
        <Toolbar sx={{
          display: "flex",
          justifyContent: "space-between"
        }}>
          <Typography variant={"subtitle1"}>Full-screen Image</Typography>
          <Button onClick={onClose} aria-label={"Close dialog"}>Close</Button>
        </Toolbar>
      </AppBar>
      <DialogContent sx={{alignContent: "center", margin: "auto"}}>
        <FullScreenImage src={image?.url} alt={image?.title} />
      </DialogContent>
    </Dialog>
  )
}

export default ImageDialog
