<?php

namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\HTTP\Response;
use CodeIgniter\HTTP\ResponseInterface;
use Exception;
use ReflectionException;
// headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=utf8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control");
class Auth extends BaseController
{
  /**
   * Get JWT For User
   */
  private function getJWTForUser(
    string $emailAddress,
    int $responseCode = ResponseInterface::HTTP_OK
  ) {
    try {
      $model = new UserModel();
      $user = $model->findUserByEmailAddress($emailAddress);
      unset($user['password']);

      helper('jwt');

      return $this
        ->getResponse(
          [
            'success' => true,
            'title' => "Başarılı!",
            'message' => 'Kullanıcı Oturumu Açma İşlemi Başarılı.',
            'user' => $user,
            'access_token' => getSignedJWTForUser($emailAddress)
          ]
        );
    } catch (Exception $exception) {
      return $this
        ->getResponse(
          [
            'success' => false,
            'title' => "Başarısız!",
            'message' => "Kullanıcı Oturumu Açma İşleminde Hata Oluştu.",
            'error' => $exception->getMessage(),
          ],
          $responseCode
        );
    }
  }

  /**
   * Register a new user
   * @return Response
   * @throws ReflectionException
   */
  public function register()
  {
    $rules = [
      'name' => 'required',
      'email' => 'required|min_length[6]|max_length[50]|valid_email|is_unique[user.email]',
      'password' => 'required|min_length[8]|max_length[255]',
      'phone' => 'required|min_length[11]|max_length[19]'
    ];

    $input = $this->getRequestInput($this->request);
    if (!$this->validateRequest($input, $rules)) {
      return $this
        ->getResponse(
          $this->validator->getErrors(),
          ResponseInterface::HTTP_BAD_REQUEST
        );
    }

    $userModel = new UserModel();
    $userModel->save($input);




    return $this
      ->getJWTForUser(
        $input['email'],
        ResponseInterface::HTTP_CREATED
      );
  }

  /**
   * Authenticate Existing User
   * @return Response
   */
  public function login()
  {
    $rules = [
      'email' => 'required|min_length[6]|max_length[50]|valid_email',
      'password' => 'required|min_length[8]|max_length[255]|validateUser[email, password]'
    ];

    $errors = [
      'password' => [
        'validateUser' => 'Geçersiz Giriş Kimlik Bilgisi Sağlandı.'
      ]
    ];

    $input = $this->getRequestInput($this->request);


    if (!$this->validateRequest($input, $rules, $errors)) {
      return $this
        ->getResponse(
          $this->validator->getErrors(),
          ResponseInterface::HTTP_BAD_REQUEST
        );
    }
    return $this->getJWTForUser($input['email']);
  }

  /**
   * Get Existing User
   * @return Response
   */
  public function getUser()
  {
    try {
      $rules = [
        'email' => 'required|min_length[6]|max_length[50]|valid_email'
      ];

      $errors = [
        'email' => [
          'validateUser' => 'Geçersiz Giriş Kimlik Bilgisi Sağlandı.'
        ]
      ];

      $input = $this->getRequestInput($this->request);


      if (!$this->validateRequest($input, $rules, $errors)) {
        return $this
          ->getResponse(
            $this->validator->getErrors(),
            ResponseInterface::HTTP_BAD_REQUEST
          );
      }
      $model = new UserModel();
      $user = $model->findUserByEmailAddress($input["email"]);
      unset($user['password']);

      helper('jwt');
      $authenticationHeader = $this->request->getServer('HTTP_AUTHORIZATION');
      $encodedToken = getJWTFromRequest($authenticationHeader);
      //\print_r($encodedToken);
      validateJWTFromRequest($encodedToken);
      return $this
        ->getResponse(
          [
            'success' => true,
            'title' => "Başarılı!",
            'message' => 'Kullanıcı Bilgileri Başarıyla Getirildi.',
            'user' => $user,
            //'access_token' => getSignedJWTForUser($input["email"])
          ]
        );
    } catch (Exception $exception) {
      return $this
        ->getResponse(
          [
            'success' => false,
            'title' => "Başarısız!",
            'message' => "Kullanıcı Bilgileri Getirilirken Hata Oluştu.",
            'error' => $exception->getMessage(),
          ],
          ResponseInterface::HTTP_OK
        );
    }
  }
}
