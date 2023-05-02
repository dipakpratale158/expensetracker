import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

import classes from "./ExpenseForm.module.css";
import { expenseActions } from "../../store/expenseReducer";
import { useSelector, useDispatch } from "react-redux";
import { themeActions } from "../../store/themeReducer";
import { CSVLink } from "react-csv";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend,  Title} from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const ExpenseForm = () => {
  const PAGE_SIZE = 5; // Number of items to display per page
const PAGE_RANGE_DISPLAYED = 5; // Number of page buttons to display

  const dispatch = useDispatch();
  const totalAmount = useSelector((state) => state.expense.totalAmount);
  const premium = useSelector((state) => state.expense.premium);
  const expenseRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const dateInputRef=useRef()
  // const [expenseData, setExpenseData] = useState();
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [expenseData, setExpenseData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  // const [selectedMonth, setSelectedMonth] = useState(null);

  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);

//****add expenses
  const expenseFormSubmitHandler = (e) => {
    e.preventDefault();
    const enteredExpense = expenseRef.current.value;
    const enteredDescription = descriptionRef.current.value;
    const enteredCategory = categoryRef.current.value;
  const enteredDateInput=dateInputRef.current.value;
    // Check that the entered expense is a number greater than 0
    if (
      enteredExpense.trim().length === 0 ||
      +enteredExpense <= 0 ||
      isNaN(+enteredExpense)
    ) {
      alert("Please enter a valid expense amount.");
      return;
    }

    // Check that the entered description is not empty
    if (enteredDescription.trim().length === 0) {
      alert("Please enter a description.");
      return;
    }

    // Check that the entered category is not empty
    if (enteredCategory.trim().length === 0) {
      alert("Please enter a category.");
      return;
    }


  
    const expenseObj = {
      expense: enteredExpense,
      description: enteredDescription,
      category: enteredCategory,
      dateInput: enteredDateInput,
    };

    fetch(
      "https://loginpage-ff00d-default-rtdb.firebaseio.com/expenses.json",
      {
        method: "POST",
        body: JSON.stringify(expenseObj),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        setStatus("Post successful");
        console.log(status);
      })
      .catch((err) => {
        alert(err.message);
      });

    expenseRef.current.value = "";
    descriptionRef.current.value = "";
    categoryRef.current.value = "";
    dateInputRef.current.value="";
  };






//delete button
  const deleteHandler = useCallback(
    (key) => {
      console.log(key);
      fetch(
        `https://loginpage-ff00d-default-rtdb.firebaseio.com/expenses/${key}.json`,
        {
          method: "DELETE",
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          setStatus("Delete successful");
          console.log(data);
          console.log(status);
        })
        .catch((err) => {
          alert(err.message);
        });
    },
    [status]
  );


  ///edit button
  const editHandler = useCallback(
    (key, expense, description, category,dateInput) => {
      console.log(key);
      fetch(
        `https://loginpage-ff00d-default-rtdb.firebaseio.com/expenses/${key}.json`,
        {
          method: "DELETE",
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          setStatus("delete before edit successful");
          console.log(data);
          console.log(status);
        })
        .catch((err) => {
          alert(err.message);
        });

      expenseRef.current.value = expense;
      descriptionRef.current.value = description;
      categoryRef.current.value = category;
      dateInputRef.current.value=dateInput
    },
    [status]
  );

  useEffect(() => {
    fetch(
      `https://loginpage-ff00d-default-rtdb.firebaseio.com/expenses.json`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        const loadedData = [];
        for (const key in data) {
          
          loadedData.push({
            key: key,
            expense: data[key].expense,
            description: data[key].description,
            category: data[key].category,
            dateInput:data[key].dateInput,
          });
        
      }
        console.log(loadedData);
        setStatus("data loaded successfully");
        console.log(status);
  
        // Sort the expenses by key to display the newest first
        loadedData.sort((a, b) => b.key.localeCompare(a.key));
  
        // Calculate the total number of pages
        const numPages = Math.ceil(loadedData.length / PAGE_SIZE);
        setTotalPages(numPages);
  
        // Fetch only the expenses for the current page
        const startIndex = (currentPage - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        const expenses = loadedData.slice(startIndex, endIndex);
  
        dispatch(expenseActions.addExpense(expenses));

        
        
    ///click add button show detatil
//         const expenseList = expenses.map(
//           ({ expense, description, category,dateInput, key }) => {
//             return (
//               <li key={key}>
//                 {/* Expense: ${expense} - Description: {description} - category:
//                 {category} - Date: {dateInput} {" "} */}
//                 <table>
//   <thead>
//     <tr>
//       <th>Expense</th>
//       <th>Description</th>
//       <th>Category</th>
//       <th>Date</th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <td>${expense}</td>
//       <td>{description}</td>
//       <td>{category}</td>
//       <td>{dateInput}</td>
//     </tr>
//   </tbody>
// </table>




//                 <button onClick={deleteHandler.bind(null, key)}>
//                   <FaTrash />
//                 </button>
//                 <button
//                   onClick={editHandler.bind(
//                     null,
//                     key,
//                     expense,
//                     description,
//                     category,
//                     dateInput,
//                   )}
//                 >
//                   <FaEdit />
//                 </button>
//               </li>
//             );
//           }
//         );
//         console.log(expenseList);
//         setExpenseData(expenseList);
//          // Calculate category totals for each page
//     const categoryTotals = {};
//     for (const expense of expenses) {
//       if (expense.category in categoryTotals) {
//         categoryTotals[expense.category] += +expense.expense;
//       } else {
//         categoryTotals[expense.category] = +expense.expense;
//       }
//     }



/////another verson 
const expenseList = expenses.map(({ expense, description, category, dateInput, key }) => {
  return (
     


    <tr key={key}>
      <td>${expense}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td>{dateInput}</td>
      <td>
        <button onClick={() => deleteHandler(key)}>
          <FaTrash />
        </button>
        <button onClick={() => editHandler(key, expense, description, category, dateInput)}>
          <FaEdit />
        </button>
      </td>
    </tr>
  );
});

console.log(expenseList);

setExpenseData(expenseList);

// Calculate category totals for each page
const categoryTotals = {};

for (const expense of expenses) {
  if (expense.category in categoryTotals) {
    categoryTotals[expense.category] += +expense.expense;
  } else {
    categoryTotals[expense.category] = +expense.expense;
  }
}






    // Sort the categories by their total expenses
    const sortedCategories = Object.keys(categoryTotals).sort(
      (a, b) => categoryTotals[b] - categoryTotals[a]
    );

    // Save the categories and their totals in a state
    setCategoryData(
      sortedCategories.map((category) => {
        return {
          category: category,
          total: categoryTotals[category],
        };
      })
    );

    // Create chart data from category totals
    setChartLabels(sortedCategories);
    setChartData(sortedCategories.map((category) => categoryTotals[category]));
 
      });
  }, [currentPage, deleteHandler, editHandler, status, dispatch]);
  



/// pi chart show abouve page
const getPageButtons = () => {
  const pageButtons = [];
  
  
  // Calculate the range of page numbers to display
  const totalPagesDisplayed = Math.min(totalPages, PAGE_RANGE_DISPLAYED);
  const halfRange = Math.floor(totalPagesDisplayed / 2);
  let startPage = currentPage - halfRange;
  let endPage = currentPage + halfRange;
  if (totalPagesDisplayed % 2 === 0) {
    endPage--;
  }
  if (startPage < 1) {
    endPage += Math.abs(startPage) + 1;
    startPage = 1;
  }
  if (endPage > totalPages) {
    startPage -= endPage - totalPages;
    endPage = totalPages;
  }
  if (startPage < 1) {
    startPage = 1;
  }
  
  // Add page buttons
  for (let i = startPage; i <= endPage; i++) {
    pageButtons.push(
      <button
        key={i}
        onClick={() => setCurrentPage(i)}
        className={i === currentPage ? classes.Active : ""}
      >
        {i}
      </button>
    );
  }
  
  return pageButtons;
  };









  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  //primium button
  const activatePremiumHandler = (e) => {
    e.preventDefault();
    dispatch(expenseActions.activatePremium());
    console.log(premium);
  };


  //theme button
  const switchThemeHandler = (e) => {
    e.preventDefault();

    dispatch(themeActions.switchTheme());
  };


  let theme = useSelector((state) => state.theme.theme);

  const data = useSelector((state) => state.expense.expense);
  const headers = [
    { label: "expense", key: "expense" },
    { label: "description", key: "description" },
    { label: "category", key: "category" },
    { label: "dateInput", key: "dateInput" },

  ];

  /////download button 
  const csvReport = { data: data, headers: headers, filename: "expenses.csv" };
  

  return (
    <Fragment>
       {getPageButtons()}

       <div>
     
{/* pichart */}
      <div>
        <h3>Expense Summary:</h3>
        {chartLabels.length > 0 ? (
<>
<div className={classes.ChartContainer}>
         
<h1>Category-wise Percentage</h1>      
<Pie
data={{
labels: chartLabels,
datasets: [
{
data: chartData,
backgroundColor: [
"#FF6384",
"#36A2EB",
"#FFCE56",
"#7FFF00",
"#FF69B4",
"#BA55D3",
"#6495ED",
"#32CD32",
"#8B008B",
"#9932CC",
"#8FBC8F",
"#FFA07A",
"#20B2AA",
"#191970",
"#FF00FF",
],
},
],
}}
/>
</div>
<div className={classes.CategoryContainer}>
{categoryData.map((category, index) => (
<div className={classes.CategoryItem} key={index}>
<div>{category.category}</div>
<div>${category.total.toFixed(2)}</div>
</div>
))}
</div>
</>

        ) : (
          <p>No expenses to display.</p>
        )}
      </div>
    </div>

{/* theme section */}
      <div
        className={
          theme === "light"
            ? classes["form-container"]
            : classes["form-container-dark"]
        }
      >
        {/*expense form  */}
        <form onSubmit={expenseFormSubmitHandler}>
          <div className={classes.control}>
            <label htmlFor="expense">Expense Amount</label>
            <br />
            <input type="number" ref={expenseRef} />
            <br />
            <label htmlFor="description">description</label>
            <br />
            <input type="text" ref={descriptionRef} />
            <br />
            <label htmlFor="category">Category</label>
            <br />
            <input list="category" ref={categoryRef} />
            <br />
            <datalist id="category">
              <option value="food" />
              <option value="fuel" />
              <option value="entertainment" />
              <option value="shopping" />
              <option value="paintings" />
              <option value="books" />
              <option value="other" />
            </datalist>
            <label htmlFor="dateInput">Date of expense:</label>
        <input
        style={{margin:"1rem"}}
          type="date"
          id="date"
          ref={dateInputRef}
          required
        />
          </div>
          <div className={classes.actions}>
            <button type="submit">Add expense</button>
          </div>
          
        
        </form>

      </div>
  

      <div
        className={theme === "light" ? classes.display : classes.darkDisplay}
        id="showExpenses"
      >
        <h3>List of expenses:</h3>
        <ul id="expenseList">{expenseData}</ul>
      </div>
      <div
        className={theme === "light" ? classes.display : classes.darkDisplay}
      >
        {/* if expense amounth >2000 showing primium button */}
        <h3>
          Total Amount:
          {totalAmount > 10000 ? (
            premium ? (
              <div>
                <p>{totalAmount}</p>
                <button onClick={switchThemeHandler}>
                  {theme === "light" ? "dark theme" : "light theme"}
                </button>
                <CSVLink {...csvReport} style={{color:"blue",margin:"1rem"}}>Download</CSVLink>
              </div>
            ) : (
              <button onClick={activatePremiumHandler}>Activate premium</button>
            )
          ) : (
            totalAmount
          )}
        </h3>




{/* pagination */}
        <div className={classes.controls}>
  <button
    disabled={currentPage === 1}
    onClick={() => handlePageChange(currentPage - 1)}
  >
    Previous
  </button>
  {Array.from({ length: totalPages }, (_, i) => (
    <button
     style={{color:"black"}}
      key={i}
      onClick={() => handlePageChange(i + 1)}
      className={i + 1 === currentPage ? classes.active : ""}
    >
      {i + 1}
    </button>
  ))}
  <button
    disabled={currentPage === totalPages}
    onClick={() => handlePageChange(currentPage + 1)}
  >
    Next
  </button>
  <div>
    Page {currentPage} of {totalPages}
  </div>
</div>


      </div>
    </Fragment>
  );
};
export default ExpenseForm;
