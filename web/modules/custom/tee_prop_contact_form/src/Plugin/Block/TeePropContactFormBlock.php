<?php
/**
 * @file
 * Contains \Drupal\tee_prop_contact_form\Plugin\Block\TeePropContactFormBlock.
 */

namespace Drupal\tee_prop_contact_form\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a block to display the contact form for Teegarden Properties.
 *
 * @Block(
 *   id = "tee_prop_contact_form_block",
 *   admin_label = @Translation("Teegarden Properties contact form"),
 *   category = "Form"
 * )
 */

class TeePropContactFormBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $form = \Drupal::formBuilder()->getForm('Drupal\tee_prop_contact_form\Form\TeePropContactForm');
    return $form;
  }
}
