<?php

    $site_owners_email = 'jordangarygerard@gmail.com'; //  recipient
    $site_owners_name = 'TSS Application'; // replace with your name

    $message = filter_var($_POST['formComments'], FILTER_SANITIZE_STRING);

    $error = "";

    if (strlen($message) < 2) {
        $error['message'] = "Please leave a comment.";
    }

    if (!$error) {

        require_once('phpmailer/class.phpmailer.php');
        $mail = new PHPMailer();

        $mail->From = 'tssapplication@jordangarygerard.com';
        $mail->FromName = 'TSS Application Feedback';
        $mail->Subject = 'Feedback submitted';
        $mail->AddAddress($site_owners_email, $site_owners_name);
        $mail->IsHTML(true);
        $mail->Body = '<b>Comments:</b> ' . $message;

        $mail->Send();

        echo "<div class='alert alert-success'  role='alert'>Thanks!</div>";

    } # end if no error
    else {

        $response .= (isset($error['message'])) ? "<div class='alert alert-danger'  role='alert'>" . $error['message'] . "</div>" : null;

        echo $response;
    } # end if there was an error sending

?>
