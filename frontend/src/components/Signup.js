import React, {useState, useEffect} from 'react';
const Signup = ()=>{

    const [FirstName, setFirstName] = useState('');
    const [LastName,setLastName] = useState('');
    const [Email,setEmail] = useState('');
    const [Password,setPassword] = useState('');
    const [ConfirmPassword,setConfirmPassword] = useState('');
    let [test,setTest] = useState(false);
    const [AllUsers,setAllUsers] = useState([]);
    const [DuplicateUser,setDuplicateUser] = useState(false);
    const URL = "http://localhost:3000/Users";

    const getAllUsers = async()=>{
        try{
        const currentUsers = await fetch(URL);
        let parsedData = await currentUsers.json();
        //console.log(AllUsers);
        console.log("Parsed Data:",parsedData)
        setAllUsers(()=>parsedData);
        console.log("Using Parsed Data:",parsedData);
        
        //Now we check if The username exists
        const duplicateUser = parsedData[0].Email;
        console.log(duplicateUser);
        console.log(Email);
        if(Email === duplicateUser){
            setDuplicateUser(()=>true);
            console.log("Duplicate User");
        }
    }catch(e){
        console.log(e);
    }
    }
    const createNewUser = async()=>{
       getAllUsers();
    }

    const preventPageReload = (e,FirstName,LastName,Email,Password,ConfirmPassword)=>{
        e.preventDefault();
        console.log("Submit Button pressed");
        //will check if any of the values are empty
        if(FirstName == " " || FirstName == undefined){
            console.log("Can not leave First Name empty");
            window.alert("Can not leave First Name empty");
        }

        if(LastName == " " || LastName == undefined){
            console.log("Can not leave Last Name empty");
            window.alert("Can not leave Last Name empty");
        }

        if(Email == " " || Email == undefined){
            console.log("Can not leave Email empty");
            window.alert("Can not leave Email empty");
        }

        if(Password == " " || Password == undefined){
            console.log("Can not leave Password empty");
            window.alert("Can not leave Password empty");
        }

        if(ConfirmPassword == " " || ConfirmPassword == undefined){
            console.log("Can not leave First Name empty");
            window.alert("Can not leave First Name empty");
        }
        //now we will check if the Password and Confirm Password are the same
        if(Password != ConfirmPassword){
            console.log("Password and Confirm Password are not the same");
            setTest(true)
        }

        createNewUser();
    }

    return(
    <section class="bg-gray-400">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          HashCon    
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">

              <div>
                      <label for="FirstName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">FirstName</label>
                      <input type="FirstName" name="FirstName" id="FirstName" class="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-10" placeholder="Enter your FirstName" required="" value={FirstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
                  </div>

                  <div>
                      <label for="LastName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">LastName</label>
                      <input type="LastName" name="FirstName" id="LastName" class="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-10" placeholder="Enter your LastName" required="" value={LastName} onChange={(e)=>{setLastName(e.target.value)}}/>
                  </div>

                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-10" placeholder="name@company.com" required="" value={Email} onChange={(e)=>{setEmail(e.target.value)}}/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-10" required="" value={Password} onChange={(e)=>{setPassword(e.target.value)}}/>
                  </div>
                  <div>
                      <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                      <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-10" required="" value={ConfirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
                  </div>
                  <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                  <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-blue-700 h-10" onClick={(e)=>{preventPageReload(e,FirstName,LastName,Email,Password,ConfirmPassword)}}>Create an account</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
  <p>{DuplicateUser && <h1>User already exist</h1>}</p>
</section>
    )
}

export default Signup;