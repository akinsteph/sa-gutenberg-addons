<?php

class Test_Tooltip_Block extends WP_UnitTestCase {
    public function test_format_registration() {
        $this->assertTrue( is_registered_block_format_type( 'tooltip/inline-tooltip' ) );
    }

    public function test_render_format() {
        $attributes = [
            'data-tooltip' => 'This is a tooltip',
        ];
        $content = 'Hover over me';
        $output = render_format_tooltip( $attributes, $content );
        $this->assertStringContainsString( 'data-tooltip="This is a tooltip"', $output );
        $this->assertStringContainsString( 'Hover over me', $output );
    }
}
?>
