<?php
/**
 * @file
 * Contains \Drupal\tee_prop_contact_form\Form\TeePropContactForm.
 */

namespace Drupal\tee_prop_contact_form\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

class TeePropContactForm extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'tee_prop_contact_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {

    $form['name'] = array(
      '#type' => 'textfield',
      '#title' => 'Name',
      '#required' => TRUE,
    );

//    $form['phone_number'] = array(
//      '#type' => 'tel',
//      '#title' => 'Phone Number',
//      '#required' => TRUE,
//    );

    $form['email'] = array(
      '#type' => 'email',
      '#title' => 'Email',
      '#required' => TRUE,
    );

//    $form['preferred_contact'] = array(
//      '#type' => 'radios',
//      '#title' => t('How do you prefer us to contact you?'),
//      '#default_value' => 'phone',
//      '#options' => array('phone' => t('Phone'), 'email' => t('Email')),
//    );


    $apartments = $this->loadApartments();
    if ($apartments) {
      $form['apartment'] = array(
        '#type' => 'checkboxes',
        '#title' => t('Which apartment(s) are you interested in?'),
        '#options' => $apartments,
      );
    }

    $form['pet'] = array(
      '#type' => 'select',
      '#title' => t('Do you have any pets?'),
      '#default_value' => 'no',
      '#options' => array(
        'no' => t('No'),
        'dog' => t('Dog'),
        'cat' => t('Cat'),
        'both' => t('Both'),
        'other' => t('Other'),
      ),
      '#required' => TRUE,
    );

    $form['message'] = array(
      '#type' => 'textarea',
      '#title' => 'Questions?',
    );

    $form['actions']['#type'] = 'actions';
    $form['actions']['submit'] = array(
      '#type' => 'submit',
      '#value' => t('Submit'),
      '#button_type' => 'primary',
    );

    // Add spam bot protection using Honeypot module.
    honeypot_add_form_protection($form, $form_state, array('honeypot'));

    return $form;
  }


  /**
   * @return array - All Apartment nodes.
   */
  private function loadApartments() {
    $results = db_query(
      "SELECT node_field_data.title, node__field_available.field_available_value FROM node_field_data INNER JOIN node__field_available ON node_field_data.nid = node__field_available.entity_id WHERE node__field_available.field_available_value = 1 AND node_field_data.status = 1"
    )->fetchAllKeyed(0,0);
    if (!empty($results)) {
      sort($results);
    }
    else {
      $results = FALSE;
    }

    return $results;
  }


  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {

  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $mailManager = \Drupal::service('plugin.manager.mail');
    $module = 'tee_prop_contact_form';
    $key = 'contact_form_submit';
    $to = 'debteegarden17@gmail.com';
    $params['name'] = $form_state->getValue('name');
    $params['email'] = $form_state->getValue('email');

    // For some stupid reason we have to use getCompleteForm() here
    // because getValue() is returning all the options for the field
    // regardless of what is selected.
    if (!empty($form_state->getCompleteForm()['apartment']['#value'])) {
      $apartment_values = array_keys($form_state->getCompleteForm()['apartment']['#value']);
      $apartments = '';
      foreach ($apartment_values as $value_key => $apartment_value) {
        $apartments .= $form['apartment']['#options'][$apartment_value];
        if ($value_key + 1 != count($apartment_values)) {
          $apartments .= ', ';
        }
      }
      $params['apartment'] = $apartments;
    }
    else {
      $params['apartment'] = '';
    }

    $params['pet'] = $form['pet']['#options'][$form_state->getValue('pet')]->render();
    $params['message'] = $form_state->getValue('message');
    $langcode = \Drupal::currentUser()->getPreferredLangcode();
    $send = true;
    $result = $mailManager->mail($module, $key, $to, $langcode, $params, NULL, $send);
    if ($result['result'] !== true) {
      drupal_set_message(t('Sorry, the form was not submitted due to a problem with our website. Please call us instead.'), 'error');
    }
    else {
      drupal_set_message(t("Thank you for your interest. We'll contact you soon!"));
    }
  }
}
