import { Modal, ModalBody } from "flowbite-react";
import { useState } from "react";
import Input from "../Input/Input";
import { userAuth } from "../Context/Auth";
import { addDoc, collection } from "firebase/firestore";
import { fetchFromFIreStore, fireStore } from "../Firebase/Firebase";
import { Product } from "../Context/Item";
import fileUpload from "../../assets/fileUpload.svg";
import loading from "../../assets/loading.gif";
import close from '../../assets/close.svg'
interface SellProps {
  toggleModalSell: () => void;
  status: boolean;
  setItems: (items: Product[]) => void;
}

const Sell = ({ toggleModalSell, status, setItems }: SellProps) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File|null>(null);

  const [submitting, setSubmitting] = useState(false);

  const auth = userAuth();

  const handleImageUpload = async(e:React.ChangeEvent<HTMLInputElement>)=>{
    if(e.target.files) setImage(e.target.files[0])
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!auth) {
      alert("please login to continue");
      setSubmitting(false);
      return;
    }
    setSubmitting(true);
    //image file ne data url aaki convert cehyyaan verdeet oru function ezhthunnu\
    //athin use cheyyunna api aan fileReader api
    const readImageDataUrl = (file:File):Promise<string>=>{
      return new Promise((res,rej)=>{
        const reader = new FileReader()
        reader.onloadend = ()=>{
          const imageUrl = reader.result as string
          localStorage.setItem(`image_${file.name}`,imageUrl)
          res(imageUrl)
        }
        reader.onerror = rej
        reader.readAsDataURL(file)

      })
    }
    
    let imageUrl:string = ''
    if(image){
      try {
         imageUrl= await readImageDataUrl(image)
      } catch (error) {
        console.log(error);
        alert('failed to read image')
        return
        
      }
    }
    const trimmedTitle = title.trim();
    const trimmedCategory = category.trim();
    const trimmedDescription = description.trim();
    if (!trimmedTitle || !trimmedDescription || !trimmedCategory) {
      alert("All fields are required");
      setSubmitting(false);
      return;
    }
    try {
      await addDoc(collection(fireStore, "products"), {
        title,
        category,
        price,
        description,
        userId: auth.uid,
        imageUrl,
        userName: auth.displayName || "ANonymous",
        createdAt: new Date().toDateString(),
      });
      const datas = await fetchFromFIreStore();
      setItems(datas);
      toggleModalSell();
    } catch (error) {
      console.log(error);
      alert("failed to add items to firestore");
    }
  };
  return (
    <div>
        <Modal  theme={{
             "content": {
                "base": "relative w-full p-4 md:h-auto",
                "inner": "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700"
            },
        }}
        onClick={toggleModalSell}
        show={status}
        className="bg-black"
        position={"center"}
        size="md"
        popup={true}
      >
        <ModalBody
          className="bg-white h-96 p-0 rounded-md"
          onClick={(event) => event.stopPropagation()}
        >
          <img onClick={()=>{
            toggleModalSell()
            setImage(null)
            }} src={close} alt="" className="w-6 absolute z-10 top-6 right-8 cursor-pointer"/>
          <div className="p-6 pl-8 pr-8 pb-8">
            <p className="font-bold text-lg mb-3">Sell Item</p>
            <form onSubmit={handleSubmit}>
              <Input setInput={setTitle} placeholder={"title"} />
              <Input setInput={setCategory} placeholder={"category"} />
              <Input
                setInput={(val) => setPrice(Number(val))}
                placeholder={"Price"}
              />
              <Input setInput={setDescription} placeholder={"Description"} />
              <div className="pt-2 w-full relative">
                {image ? (
                  <div className="relative h-40 sm:h-60 w-full flex justify-center border-2 border-black border-solid rounded-md overflow-hidden">
                    <img
                      className="object-contain"
                      src={URL.createObjectURL(image)}
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="relative h-40 sm:h-60 w-full border-2 border-black border-solid rounded-md">
                    <input
                    onChange={handleImageUpload}
                      type="file"
                      className="absolute inset-10 h-full w-full opacity-0 cursor-pointer z-30"
                      required
                    />
                    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center">
                      <img className="w-12" src={fileUpload} alt="" />
                      <p className="text-center text-sm pt-2">
                        Click to upload images
                      </p>
                      <p className="text-center text-sm pt-2">SVG, PNG, JPG</p>
                    </div>
                  </div>
                )}
              </div>
              {submitting? (
              <div className="w-full flex h-14 justify-center pt-4 pb-2">
                <img className="w-32 object-cover" src={loading} alt="" />
              </div>
              ) : (
              <div className="w-full pt-2">
                <button
                  className="w-full p-3 rounded-lg text-white"
                  style={{ backgroundColor: "#002f34" }}
                >
                  {" "}
                  Sell Item{" "}
                </button>
              </div>
              )}
            </form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Sell;
