<?php
class Theme_Tags_Widget extends WP_Widget {
	function __construct() {
		parent::__construct(
			'theme_tags', // Base ID
			esc_html__( 'Tags', 'text_domain' ), // Name
			array( 'description' => esc_html__( 'Displays tags cloud', 'text_domain' ), ) // Args
		);
	}

	public function widget( $args, $instance ) {
		echo $args['before_widget'];
		if ( ! empty( $instance['title'] ) ) {
			echo $args['before_title'] . apply_filters( 'widget_title', $instance['title'] ) . $args['after_title'];
		}
		echo esc_html__( 'Hello, World!', 'text_domain' );
		echo $args['after_widget'];
	}

	public function form( $instance ) {
		$title = ! empty( $instance['title'] ) ? $instance['title'] : esc_html__( 'Tags', 'text_domain' );
		$text = ! empty( $instance['text'] ) ? $instance['text'] : esc_html__( '', 'text_domain' );
		$tags = ! empty( $instance['tags'] ) ? $instance['tags'] : [];
		?>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>">
				<?php esc_attr_e( 'Title:', 'text_domain' ); ?>
			</label>
			<input
				class="widefat"
				id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"
				name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>"
				type="text"
				value="<?php echo esc_attr( $title ); ?>"
			>
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'text' ) ); ?>">
				<?php esc_attr_e( 'Text:', 'text_domain' ); ?>
			</label> 
			<input 
				class="widefat"
				id="<?php echo esc_attr( $this->get_field_id( 'text' ) ); ?>"
				name="<?php echo esc_attr( $this->get_field_name( 'text' ) ); ?>"
				type="text"
				value="<?php echo esc_attr( $text ); ?>"
			>
		</p>
		<p>
			<ul style="display: flex;flex-flow: row wrap;">
				<?php foreach($tags as $key=>$value): ?>
			    <li style="padding: 4px 6px; margin-right: 10px; background: rgba(0,0,0,0.1); border: 1px solid rgba(0,0,0,0.8);  border-radius: 8px;">
			        <?=$value->name; ?>
			    </li>
			    <?php endforeach; ?>
			</ul>
		</p>
		<?php 
	}

	public function update( $new_instance, $old_instance ) {
		$instance = array();
		$instance['title'] = ( ! empty( $new_instance['title'] ) ) ? sanitize_text_field( $new_instance['title'] ) : '';
		$instance['text'] = ( ! empty( $new_instance['text'] ) ) ? sanitize_text_field( $new_instance['text'] ) : '';
		$instance['tags'] = self::get_tags();


		return $instance;
	}

	public function get_tags() {
		$tags = get_tags();
        $tags = array_map(function($tag) {
            $tag->url = parse_url(get_tag_link($tag->term_id))['path'];
            return $tag;
        }, $tags);
        return $tags;
	}
}