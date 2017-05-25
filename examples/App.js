import React from 'react';
import { Form, Button } from 'antd';
import './app.css';
import FocusEditor from '../src/FocusEditor';

class App extends React.Component {
  render() {
    return (<div style={{ margin: '240px' }}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
              console.log(values);
            }
          });
        }}
      >
        <Form.Item
          label="内容"
          hasFeedback
        >
          {this.props.form.getFieldDecorator('content', {
            rules: [
              {
                required: true,
                message: '内容不能为空',
              },
            ],
            initialValue: `<div><span style="font-family:'Microsoft YaHei'; font-size:14px">&nbsp;&nbsp;&nbsp;&nbsp;2016年12月20日，湖北省腾云网络科技有限责任公司(以下简称：腾云公司）股票代码：366101；在深圳前海股权交易中心参加了挂牌企业授牌仪式，宣告正式迈入资本市场。</span></div>

<div>
<embed style="width:600px;height:400px;" src="http://player.youku.com/player.php/sid/XMjc4MzczNTgwMA==/v.swf"/>
</div>


<div style="text-align:center"><img alt="" src="https://img.96tyw.com/uploads/editor/20170116/14845439272428.jpg" style="height:480px; width:640px" /></div>

<div style="text-align:center"><span style="font-family:'Microsoft YaHei'; font-size:14px"><strong><span style="background-color:#e53333; color:#000000; font-size:10px">▲</span><span style="color:#000000; font-size:10px">敲响上市宝钟，腾云新起点，新腾飞！</span></strong></span></div>

<p><span style="font-family:'Microsoft YaHei'; font-size:14px">腾云公司董事长袁光美先生，腾云广东省负责人朱伟娴女士敲响上市宝钟，共同见证了腾云公司这一重要的里程碑时刻。<a href="https://www.baidu.com">百度一下，你就知道</a></span></p>

<p>&nbsp;</p>

<div><span style="background-color:#e53333; color:#ffffff; font-family:'Microsoft YaHei'; font-size:14px">跨界融合，电商业新四板第一股树立典范</span></div>

<div><span style="font-family:'Microsoft YaHei'; font-size:14px">敲钟仪式上，腾云公司董事长袁光美先生表示：借此新起点，腾云公司将充分利用辐射全国的联盟商家及96商城网络优势，通过&ldquo;大品牌推广计划&rdquo;，进一步提高平台创新优势，加大互联网服务的研发，倾力打造&ldquo;中国梦&middot;腾云梦&rdquo;文化，树立具有国际竞争力的中国民族品牌典范。</span></div>

<div><span style="font-family:'Microsoft YaHei'; font-size:14px">&nbsp;</span></div>

<div><span style="background-color:#e53333; color:#ffffff; font-family:'Microsoft YaHei'; font-size:14px">资本青睐，腾云速度值得万众期待</span></div>

<p><span style="font-family:'Microsoft YaHei'; font-size:14px">近年来，随着国内消费环境的变化，实体行业受冲击下滑，电商行业却风生水起、热火朝天。局部市场虽有微弱下滑，但实体行业依然持续增长。&ldquo;020模式（线上、线下）&rdquo;从一个新生概念迅速走红，如今已成为实体行业掘金的主流方向。各行各业向更大规模、更多经营、更多业态跨界的实体店领域进军。</span></p>

<div><span style="font-family:'Microsoft YaHei'; font-size:14px">创办于2014年的腾云公司3年间，凭借领先的创新理念和卓越的平台价值体系，实现多方共赢。从而打造一个&ldquo;人人消费、人人参与、人人就业&rdquo;的创富平台运用三网【天网、地（店）网、人网】线上&ldquo;96商城&rdquo;与线下实体商家，以及通过人力资源网络的链接聚焦。通过促进和服务，有效地凝聚、拉长各个方面有效资源链条，再进行聚合裂变完成运营。在消费的同时拉动内需，提高经济的快速增长，又通过经济的快速增长，最终实现消费者&ldquo;全民皆富&rdquo;。</span></div>

<div style="text-align:center"><img alt="" src="https://img.96tyw.com/uploads/editor/20170117/14846233178655.jpg" style="width:70%" /></div>

<div><span style="font-family:'Microsoft YaHei'; font-size:14px">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span style="font-size:12px">&nbsp;&nbsp;<span style="color:#000000">&nbsp;</span></span><strong><span style="background-color:#e53333; color:#000000; font-size:12px">▲</span><span style="color:#000000; font-size:12px">腾云公司高管合影</span></strong></span></div>

<div><span style="font-family:'Microsoft YaHei'; font-size:14px">在新四板挂牌上市的利好形势下，腾云公司可以借力资本市场顺畅的融资渠道，运用多种工具和手段进行资本运作，加快企业扩张发展与战略布局，增强企业综合实力和核心竞争力。据此，多位金融业内人士对腾云公司未来在资本市场的发展寄予厚望。</span></div>

<div>&nbsp;</div>

<div><span style="background-color:#e53333; color:#ffffff; font-family:'Microsoft YaHei'; font-size:14px">扬帆上势，腾云寻本溯源文化引领未来</span></div>

<div><span style="font-family:'Microsoft YaHei'; font-size:14px">高瞻远瞩的发展规划离不开坚定沉稳的内在文化。《腾云消费服务之歌》充分展现了腾云公司合纵连横、圆融贯通的企业文化。</span></div>

<div>&nbsp;</div>

<div><span style="font-family:'Microsoft YaHei'; font-size:14px">承载坚定沉稳文化的腾云公司以实现消费者&ldquo;全民皆富&rdquo;为目标，投入巨资导入&ldquo;腾云96商城&rdquo;项目，公司着眼于全面长期发展，在一定阶段将实现对中小型企业提供金融孵化服务和创业人员提供资金扶持，亮点是后期以&ldquo;互联网+&rdquo;行动计划为牵引，着力打造地面体验店，实现真正意义上的互联网落地，对接涵盖日常生活必须的所有行业，做到消费者&ldquo;衣食住行外包&rdquo;，区域覆盖，实现1小时生活圈，打造智慧城市。</span></div>

<div>&nbsp;</div>

<p><span style="font-family:'Microsoft YaHei'; font-size:14px">在未来的资本道路上，腾云将不忘初心，回归腾云电商研发本质，一如既往服务用户，真正实现&ldquo;多方共赢&rdquo;的信念。</span></p>

<p>&nbsp;</p>

<p style="text-align:center"><span style="color:#000000; font-family:'Microsoft YaHei'; font-size:14px"><strong>更多上市挂牌现场照</strong></span></p>

<p style="text-align:center"><img alt="" src="https://img.96tyw.com/uploads/editor/20170117/14846233574063.jpg" style="height:472px; width:571px" /></p>

<p>&nbsp;</p>

`,
          })(
            <FocusEditor
              onAudioUpload={(file, fileList, callback) => {
                callback('http://ip.h5.rc03.sycdn.kuwo.cn/80bf9b8943f17f079e4c42e53dcc58ae/591ec41f/resource/a2/4/18/2144584884.aac');
              }}
              onImageUpload={(file, fileList, callback) => {
                callback('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495217144587&di=24da7bc2794f3d602279fe35cf8a287b&imgtype=0&src=http%3A%2F%2Fimg.tupianzj.com%2Fuploads%2Fallimg%2F160527%2F9-16052F93601.jpg');
              }}
              onVideoUpload={(file, fileList, callback) => {
                callback('http://www.w3school.com.cn/i/movie.ogg');
              }}
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">保存</Button>
        </Form.Item>
      </Form>
    </div>);
  }
}
export default Form.create()(App);
