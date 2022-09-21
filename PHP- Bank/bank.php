<?php
session_start();
$servername = "MySQL";
$username = "sgaesho";
$password = "sgaesho";
$dbname = "sgaesho";
/*
Parts of code was modified from (https://www.youtube.com/watch?v=kEW6f7Pilc4)
Parts of code was modified from (https://www.youtube.com/watch?v=OK_JCtrrv-c&t=253s)
Parts of code was modifed from (https://phpdelusions.net/pdo)
Parts of code was modifed from (https://www.php.net/manual/en/book.pdo.php)
Parts of code was modified from (https://www.youtube.com/watch?v=u10xZgNpfCQ)
*/
try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    exit();
}
if (isset($_POST['sender_id'])){
    $sender_id = $_POST['sender_id'];
    $sender_dt_query = "select *from accounts where id = '$sender_id'";
    $sender_dt_result = $conn->query($sender_dt_query);
    $sender_dt_row = $sender_dt_result->fetch();
}
if (isset($_POST['rec_id'])){
    $rec_id = $_POST['rec_id'];
    $rec_dt_query = "select *from accounts where id = '$rec_id'";
    $rec_dt_result = $conn->query($rec_dt_query);
    $rec_dt_row = $rec_dt_result->fetch();
}
if (isset($_POST['hak_submit'])){
    $sender_id = $_POST['sender_id'];
    $rec_id = $_POST['rec_id'];
    $amount = $_POST['amount'];
    $ref = $_POST['ref'];
    $sender_id = $_POST['sender_id'];
    $rec_balance = $rec_dt_row['balance'];
    $init_balance = $sender_dt_row['balance'];
    if ($init_balance >= $amount){
        $insert_record_query = "INSERT INTO `records`(`sender_id`, `rec_id`, `amount`, `ref`) VALUES (?,?,?,?)";
        try{
            $conn->prepare($insert_record_query)->execute([$sender_id, $rec_id, $amount, $ref]);
            $new_sender_balance = $init_balance - $amount;
            $update_sender_query = "UPDATE accounts SET balance=? WHERE id=?";
            $conn->prepare($update_sender_query)->execute([$new_sender_balance, $sender_id]);
            $new_rec_balance = $rec_balance + $amount;
            $update_rec_query = "UPDATE accounts SET balance=? WHERE id=?";
            $conn->prepare($update_rec_query)->execute([$new_rec_balance, $rec_id]);
            $success_message = 'Record Added Successfully';
        }catch (PDOException $e){
            $error_message = 'Record added failed. Server Error';
        }
    }else{
        $od_balance = $sender_dt_row['overdraft'];
        $total_balance = $sender_dt_row['balance'] + $sender_dt_row['overdraft'];
        if ($total_balance >= $amount){
            $insert_record_query = "INSERT INTO `records`(`sender_id`, `rec_id`, `amount`, `ref`) VALUES (?,?,?,?)";
            try{
                $conn->prepare($insert_record_query)->execute([$sender_id, $rec_id, $amount, $ref]);
                $new_sender_balance = $total_balance - $amount;
                $update_sender_query = "UPDATE accounts SET balance=?, overdraft=? WHERE id=?";
                $conn->prepare($update_sender_query)->execute([0, $new_sender_balance, $sender_id]);
                $new_rec_balance = $rec_balance + $amount;
                $update_rec_query = "UPDATE accounts SET balance=? WHERE id=?";
                $conn->prepare($update_rec_query)->execute([$new_rec_balance, $rec_id]);
                $success_message = 'Record Added Successfully';
            }catch (PDOException $e){
                $error_message = 'Record added failed. Server Error';
            }
        }else{
            $error_message = 'Insufficient Balance';
        }
    }
}
?>
<!DOCTYPE html>
<html>
<head>
<body>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body {font-family: Arial, Helvetica, sans-serif; text-align: center;}
        * {box-sizing: border-box;
            margin-top: 30px;
        }

        h1{

            text-align: center;
        }

        .form-inline {
            display: inline-block;
            flex-flow: row wrap;
            align-items: center;
            border: 2px dotted gray;
            padding: 50px;
            margin-top: 30px;
        }

        .form-inline label {
            margin: 5px 10px 5px 0;
            font-size: 20px;
        }

        .form-heading {
            font-size: 28px;
            text-align: left;
            color: green;
            margin-top: 0px;
        }

        .form-error {
            font-size: 20px;
            text-align: left;
            color: red;
            margin-top: 0px;
            display: block;
            background: #dddddd;
            padding: 5px 20px;
            border-left: 2px solid red;
        }

        .form-success {
            font-size: 20px;
            text-align: left;
            color: green;
            margin-top: 0px;
            display: block;
            background: #dddddd;
            padding: 5px 20px;
            border-left: 2px solid green;
        }

        .form-inline input {
            vertical-align: middle;
            margin: 5px 10px 5px 0;
            padding: 10px;
            background-color: #fff;
            border: 1px solid #ddd;
            min-width: 300px;
        }

        .form-inline select {
            vertical-align: middle;
            margin: 5px 10px 5px 0;
            padding: 10px;
            background-color: #fff;
            border: 1px solid #ddd;
            font-size: 20px;
        }

        .form-inline button {
            padding: 5px 20px;
            background-color: dodgerblue;
            border: 1px solid #ddd;
            color: white;
            cursor: pointer;
            font-size: 25px;
            margin: 5px 10px 0px 0px;
        }

        .form-inline button:hover {
            background-color: royalblue;
        }

        .error_span{
            color:red;
            background-color: #ddd;
            text-align: left;
            padding: 10px;
            line-height: 22px;
        }

        .success_span{
            color:green;
            background-color: #ddd;
            text-align: left;
            padding: 10px;
            line-height: 22px;
        }

        @media (max-width: 800px) {
            .form-inline input {
                margin: 10px 0;
            }

            .form-inline {
                flex-direction: column;
                align-items: stretch;
            }
        }
        .hak_table {
            font-family: Arial, Helvetica, sans-serif;
            border-collapse: collapse;
            width: 80%;
            text-align: center;
        }

        .hak_table td, .hak_table th {
            border: 1px solid #ddd;
            padding: 8px;
        }

        .hak_table tr:nth-child(even){background-color: #f2f2f2;}

        .hak_table tr:hover {background-color: #ddd;}

        .hak_table th {
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: left;
            background-color: #04AA6D;
            color: white;
            text-align: center;
        }
    </style>
</head>


<h1>Welcome To My Bank | Funds Transfer</h1>
<?php
//if (isset($_SESSION['error']) && $_SESSION['error'] != ''){
//    ?>
<!--    <h2 class="form-heading">--><?php //echo $_SESSION['error'];?><!--</h2>-->
<?php
//    $_SESSION['error'] = '';
//}
//?>

<?php
if (isset($_POST['sender_id_submit'])){
    if (isset($_POST['sender_id']) && !empty($_POST['sender_id'])){
        $sender_id = $_POST['sender_id'];
        $rec_accounts_query = "select *from accounts where id != '$sender_id'";
        $rec_accounts_result = $conn->query($rec_accounts_query);
        $rec_accounts_rows = $rec_accounts_result->fetchAll();
        ?>
        <form class="form-inline" action="" method="post">
            <h2 class="form-heading">STEP 2 </h2>
            <label for="amount">Payer's Account Detail : <?php echo $sender_dt_row['name'];?> - <?php echo $sender_dt_row['number'];?></label><br/><br/>
            <label for="rec_id">Select Payee's Bank Account:</label>
            <select name="rec_id" id="rec_id">
                <option value="">Select Payee's Bank Account</option>
                <?php
                foreach ($rec_accounts_rows as $ra_row) {
                    ?>
                    <option value="<?php echo $ra_row['id'];?>"><?php echo $ra_row['name'];?> - <?php echo $ra_row['number'];?></option>
                    <?php
                }
                ?>
            </select>
            <input name="sender_id" value="<?php echo $sender_id;?>" hidden>
            <button type="submit" name="rec_id_submit">NEXT</button>
        </form>
        <?php
    }else{
        $sender_accounts_query = "select *from accounts";
        $sender_accounts_result = $conn->query($sender_accounts_query);
        $sender_accounts_rows = $sender_accounts_result->fetchAll();
        ?>
        <form class="form-inline" action="" method="post">
            <h2 class="form-heading">STEP 1 </h2>
            <span class="form-error">Please Select Payer's Bank Account First </span>
            <label for="sender_id">Select Payer's Bank Account:</label>
            <select name="sender_id" id="sender_id">
                <option value="">Select Payer's Bank Account</option>
                <?php
                foreach ($sender_accounts_rows as $sa_row) {
                    ?>
                    <option value="<?php echo $sa_row['id'];?>"><?php echo $sa_row['name'];?> - <?php echo $sa_row['number'];?></option>
                    <?php
                }
                ?>
            </select>
            <button type="submit" name="sender_id_submit">NEXT</button>
        </form>
<?php
    }
    ?>
<?php
}else if (isset($_POST['rec_id_submit'])){
    if (isset($_POST['rec_id']) && !empty($_POST['rec_id'])){
        $rec_id = $_POST['rec_id'];
        $sender_id = $_POST['sender_id'];
        ?>
        <form class="form-inline" action="" method="post">
            <h2 class="form-heading">STEP 3 </h2>
            <label for="amount">Payer's Account Detail : <?php echo $sender_dt_row['name'];?> - <?php echo $sender_dt_row['number'];?></label><br/>
            <label for="amount">Payee's Account Detail : <?php echo $rec_dt_row['name'];?> - <?php echo $rec_dt_row['number'];?></label><br/><br/>
            <label for="amount">Amount £:</label>
            <input type="text" id="amount" placeholder="Enter Amount" name="amount">
            <input name="sender_id" value="<?php echo $sender_id;?>" hidden>
            <input name="rec_id" value="<?php echo $rec_id;?>" hidden>
            <button type="submit" name="amount_submit">NEXT</button>
        </form>
        <?php
    }else{
        $sender_id = $_POST['sender_id'];
        $rec_accounts_query = "select *from accounts where id != '$sender_id'";
        $rec_accounts_result = $conn->query($rec_accounts_query);
        $rec_accounts_rows = $rec_accounts_result->fetchAll();
        ?>
        <form class="form-inline" action="" method="post">
            <h2 class="form-heading">STEP 2 </h2>
            <span class="form-error">Please Select Payee's Bank Account First </span>
            <label for="amount">Payer's Account Detail : <?php echo $sender_dt_row['name'];?> - <?php echo $sender_dt_row['number'];?></label><br/><br/>
            <label for="rec_id">Select Payee's Bank Account:</label>
            <select name="rec_id" id="rec_id">
                <option value="">Select Payee's Bank Account</option>
                <?php
                foreach ($rec_accounts_rows as $ra_row) {
                    ?>
                    <option value="<?php echo $ra_row['id'];?>"><?php echo $ra_row['name'];?> - <?php echo $ra_row['number'];?></option>
                    <?php
                }
                ?>
            </select>
            <input name="sender_id" value="<?php echo $sender_id;?>" hidden>
            <button type="submit" name="rec_id_submit">NEXT</button>
        </form>
        <?php
    }
    ?>
    <?php
}else if (isset($_POST['amount_submit'])){
    if (isset($_POST['amount']) && !empty($_POST['amount'])){
        $amount = $_POST['amount'];
        $old_amount = $_POST['amount'];
        $rec_id = $_POST['rec_id'];
        $sender_id = $_POST['sender_id'];
        function convertToValidPrice($amount) {
            $amount = str_replace(['-', ',', '$', ' '], '', $amount);
            if(!is_numeric($amount)) {
                $amount = null;
            } else {
                if(strpos($amount, '.') !== false) {
                    $dollarExplode = explode('.', $amount);
                    $dollar = $dollarExplode[0];
                    $cents = $dollarExplode[1];
                    if(strlen($cents) === 0) {
                        $cents = '00';
                    } elseif(strlen($cents) === 1) {
                        $cents = $cents.'0';
                    } elseif(strlen($cents) > 2) {
                        $cents = substr($cents, 0, 2);
                    }
                    $amount = $dollar.'.'.$cents;
                } else {
                    $cents = '00';
                    $amount = $amount.'.'.$cents;
                }
            }

            return $amount;
        }
        $amount = convertToValidPrice($amount);
        if ($amount != '' && $old_amount >= 0 && $amount <= 10000){
            ?>
            <form class="form-inline" action="" method="post">
                <h2 class="form-heading">STEP 4 </h2>
                <label for="amount">Payer's Account Detail : <?php echo $sender_dt_row['name'];?> - <?php echo $sender_dt_row['number'];?></label><br/>
                <label for="amount">Payee's Account Detail : <?php echo $rec_dt_row['name'];?> - <?php echo $rec_dt_row['number'];?></label><br/>
                <label for="amount">Amount : <?php echo $amount;?></label><br/><br/>
                <label for="amount">Reference Note :</label>
                <input type="text" id="amount" placeholder="Max 20 Characters" name="ref">
                <input name="amount" value="<?php echo $amount;?>" hidden>
                <input name="sender_id" value="<?php echo $sender_id;?>" hidden>
                <input name="rec_id" value="<?php echo $rec_id;?>" hidden>
                <button type="submit" name="ref_submit">NEXT</button>
            </form>
            <?php
        }else{
            ?>
            <form class="form-inline" action="" method="post">
                <h2 class="form-heading">STEP 3 </h2>
                <label for="amount">Payer's Account Detail : <?php echo $sender_dt_row['name'];?> - <?php echo $sender_dt_row['number'];?></label><br/>
                <label for="amount">Payee's Account Detail : <?php echo $rec_dt_row['name'];?> - <?php echo $rec_dt_row['number'];?></label><br/><br/>
                <span class="form-error">Please Enter The Valid Amount between £0.00 and £10000.00</span>
                <label for="amount">Amount £:</label>
                <input type="text" id="amount" placeholder="Enter Amount" name="amount">
                <input name="sender_id" value="<?php echo $sender_id;?>" hidden>
                <input name="rec_id" value="<?php echo $rec_id;?>" hidden>
                <button type="submit" name="amount_submit">NEXT</button>
            </form>
            <?php
        }
        ?>
        <?php
    }else{
        $rec_id = $_POST['rec_id'];
        $sender_id = $_POST['sender_id'];
        ?>
        <form class="form-inline" action="" method="post">
            <h2 class="form-heading">STEP 3 </h2>
            <span class="form-error">Please Enter The Amount between £0.00 and £10000.00</span>
            <label for="amount">Payer's Account Detail : <?php echo $sender_dt_row['name'];?> - <?php echo $sender_dt_row['number'];?></label><br/>
            <label for="amount">Payee's Account Detail : <?php echo $rec_dt_row['name'];?> - <?php echo $rec_dt_row['number'];?></label><br/><br/>
            <label for="amount">Amount £:</label>
            <input type="text" id="amount" placeholder="Enter Amount" name="amount">
            <input name="sender_id" value="<?php echo $sender_id;?>" hidden>
            <input name="rec_id" value="<?php echo $rec_id;?>" hidden>
            <button type="submit" name="amount_submit">NEXT</button>
        </form>
        <?php
    }
    ?>
    <?php
}else if (isset($_POST['ref_submit'])){
    if (isset($_POST['ref']) && !empty($_POST['ref']) && !preg_match('/[^\x20-\x7e]/', $_POST['ref'])){
        $ref = $_POST['ref'];
        $amount = $_POST['amount'];
        $rec_id = $_POST['rec_id'];
        $sender_id = $_POST['sender_id'];
        ?>
        <form class="form-inline" action="" method="post">
            <h2 class="form-heading">STEP 5 </h2>
            <label for="amount">Payer's Account Detail : <?php echo $sender_dt_row['name'];?> - <?php echo $sender_dt_row['number'];?></label><br/>
            <label for="amount">Payee's Account Detail : <?php echo $rec_dt_row['name'];?> - <?php echo $rec_dt_row['number'];?></label><br/>
            <label for="amount">Amount : <?php echo $amount;?></label><br/>
            <label for="amount">Reference Text : <?php echo $ref;?></label><br/><br/>
            <input name="ref" value="<?php echo $ref;?>" hidden>
            <input name="amount" value="<?php echo $amount;?>" hidden>
            <input name="sender_id" value="<?php echo $sender_id;?>" hidden>
            <input name="rec_id" value="<?php echo $rec_id;?>" hidden>
            <button type="submit" name="hak_submit">SUBMIT</button>
        </form>
        <?php
    }else{
        $amount = $_POST['amount'];
        $rec_id = $_POST['rec_id'];
        $sender_id = $_POST['sender_id'];
        ?>
        <form class="form-inline" action="" method="post">
            <h2 class="form-heading">STEP 4 </h2>
            <span class="form-error">Please Enter The Valid Reference Note</span>
            <label for="amount">Payer's Account Detail : <?php echo $sender_dt_row['name'];?> - <?php echo $sender_dt_row['number'];?></label><br/>
            <label for="amount">Payee's Account Detail : <?php echo $rec_dt_row['name'];?> - <?php echo $rec_dt_row['number'];?></label><br/>
            <label for="amount">Amount : <?php echo $amount;?></label><br/><br/>
            <label for="amount">Reference Note :</label>
            <input type="ref" id="amount" placeholder="Max 20 Characters" name="ref">
            <input name="amount" value="<?php echo $amount;?>" hidden>
            <input name="sender_id" value="<?php echo $sender_id;?>" hidden>
            <input name="rec_id" value="<?php echo $rec_id;?>" hidden>
            <button type="submit" name="ref_submit">NEXT</button>
        </form>
        <?php
    }
    ?>
    <?php
}else{
    $sender_accounts_query = "select *from accounts";
    $sender_accounts_result = $conn->query($sender_accounts_query);
    $sender_accounts_rows = $sender_accounts_result->fetchAll();
    ?>
    <form class="form-inline" action="" method="post">
        <?php
        if (isset($error_message)){
            ?>
            <span class="form-error"><?php echo $error_message;?></span>
            <?php
        }
        if (isset($success_message)){
            ?>
            <span class="form-success"><?php echo $success_message;?></span>
            <?php
        }
        ?>
        <h2 class="form-heading">STEP 1 </h2>
        <label for="sender_id">Select Payer's Bank Account:</label>
        <select name="sender_id" id="sender_id">
            <option value="">Select Payer's Bank Account</option>
            <?php
            foreach ($sender_accounts_rows as $sa_row) {
                ?>
                <option value="<?php echo $sa_row['id'];?>"><?php echo $sa_row['name'];?> - <?php echo $sa_row['number'];?></option>
                <?php
            }
            ?>
        </select>
        <button type="submit" name="sender_id_submit">NEXT</button>
    </form>
<?php
}
?>

</body>
</html>